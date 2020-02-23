from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from google.cloud import storage
from google.auth import compute_engine
import pymongo
from bson.objectid import ObjectId
import random
import string
import os
import requests
from mailer import *
from desert import indesert
from geocode import geocode
from datetime import datetime
from geojson import FeatureCollection, Feature, Point 
import geojson

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://branson:feedeveryone@public-potluck-usqqb.gcp.mongodb.net/test?retryWrites=true&w=majority")
db = client['pubpot']
users = db['users']
events = db['events']

# Configure Access to Cloud Bucket
credentials = compute_engine.Credentials()
client = storage.Client(credentials=credentials)
bucket = client.get_bucket('publicpotluck')

######################
#### IMAGE UPLOAD ####
######################

@app.route('/upload', methods=['POST'])
def upload():

    # Get File
    img_file = request.files['img']

    # Get File Type (Extension)
    extension = os.path.splitext(img_file.filename)[1]
    content_type = {
        ".png":"image/png",
        ".jpg":"image/jpeg"
    }[extension]
    
    # Generate a Random URL
    rand_url = ''.join(random.choice(string.ascii_letters) for i in range(30))

    # Upload
    blobup = bucket.blob(f'{rand_url}.{extension}')
    blobup.upload_from_file(img_file, content_type=content_type)

    # Return the Image URL, Then Gets Put in Form Submit
    msg = {'message': 'Image Uploaded', 'code' : 'Success', 'img_url': 'https://storage.googleapis.com/publicpotluck/' + f'{rand_url}.{extension}'}
    return make_response(jsonify(msg), 201)


###############
#### USERS ####
###############

# Create a New User
@app.route('/create/user', methods=['POST'])
def newuser():
    form = request.form
    email = form['email']
    # Check if Email Exists
    if bool(list(users.find({'email': email}))):
        return 'An Account with this Email Already Exists'
    else:
        user = {
            'email' : email,
            'phone' : form['phone'],
            'verified' : False,
            'password' : form['password'],
            'name' : form['name'],
            'city' : form['city'],
            'photo' : 'default', # Need to add a Default Photo Here
            'donations' : [],
            'events' : [],
            'secret' : ''.join(random.choice(string.ascii_letters) for i in range(30))
        }
        users.insert_one(user)
        # Send an Email with the Secret User ID Link
        user = users.find_one({'email':email})
        _id = user['_id']
        msg = '<h3>Please Verify Your Account</h3><p><a href="http://api.publicpotluck.com/verify/' + str(_id) + '">Click Here</a> or Paste this URL in Your Browser: http://api.publicpotluck.com/verify/' + str(_id) +'</p>'
        send_email(email, 'Public Potluck - Account Verification', msg)
        return 'Check your Email and Verify your Account'

# Verify a User
@app.route('/verify/<userid>/', methods=['GET'])
def verifyuser(userid):
    userid = str(userid)
    # Check that ID is Valid Format
    if len(userid) != 24:
        return 'Invalid Verification ID Length'
    # Check for Valid Userid
    elif not bool(list(users.find_one({'_id':ObjectId(userid)}))):
        return 'Invalid Verification Code'
    else:
        update = {'verified' : True}
        users.find_one_and_update({'_id':ObjectId(userid)}, {'$set' : update})
        return 'Account Successfully Verified'

# Login
##### CLIENT SIDE???
@app.route('/login', methods=['POST'])
def login():
    form = request.form
    find = {
        'email' : form['email'],
        'password' : form['password']
    }
    user = users.find_one(find)
    if not user:
        return 'Wrong Email/Password'
    msg = {'message': 'Login Successful', 'code' : 'Success', 'usercookie' : user['secret']}
    resp = make_response(jsonify(msg), 200)

    return resp

# Logout
##### CLIENT SIDE???
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    resp = make_response('Logout Successful')
    resp.set_cookie('user', expires=0)
    return resp

# Get User Information (serve profile)
@app.route('/user/<email>', methods=['GET'])
def getuser(email):
    user = users.find_one({'email':email})

    info = {
        'name' : user['name'],
        'email' : email,
        'phone' : user['phone'],
        'city' : user['city']
    }
    return info

################
#### EVENTS ####
################

# Create an Event
@app.route('/create/event', methods=['POST'])
def newevent():
    json = request.json

    event = {
        'host_name' : json['host_name'],
        'city' : json['city'], 
        'address' : json['location_address'],
        'coordinates' : geocode(json['location_address']),
        'location_name' : json['location_name'],
        'event_name' : json['event_name'],
        'event_description' : json['event_desc'],
        'date_time' : json['date_time'],
        'duration' : json['duration'],
        'max_attendees' : json['max_attendees'],
        'attendees' : [],
        'fund_goal': json['fund_goal'],
        'funds' : 0,
        'img_url' : json['img_url'],
        'tags' : json['tags'],
        'price' : json['price'],
        'leftovers' : json['leftovers'],
        'time_created' : datetime.today()
    }
    event['desert'] = indesert(event['coordinates'])

    events.insert_one(event)

    msg = {'message': 'Event Created', 'code' : 'Success'}
    resp = make_response(jsonify(msg), 201)
    return resp

# Query All Events (For User City)
@app.route('/events', methods=['GET'])
def getevents():
    params = request.args
    city = params['city']

    events_q = events.find({'city' : city}).sort("time_created", pymongo.DESCENDING).limit(100)

    event_list = [{
        '_id':str(i['_id']),
        'event_name': i['event_name'],
        'location_name':i['location_name'],
        'date_time':i['date_time'],
        'coordinates':i['coordinates'], # Maybe Need to Make GeoJSON
        'img_url':i['img_url'],
        'isFoodDesert':i['desert'],
        'tags':i['tags']
    } for i in events_q]

    return make_response(jsonify(event_list), 200)

# Get Event Details
@app.route('/event/<eventid>', methods=['GET'])
def eventdetail(eventid):
    eventid = str(eventid)
    details = events.find_one({'_id': ObjectId(eventid)}, {'_id' : 0})

    return make_response(jsonify(details), 200)

# Get Geo
@app.route('/events/geo', methods=['GET'])
def getgeo():
    city = request.args.get('city')
    events_q = events.find({'city' : city}, projection={'coordinates':1,'event_name':1,'_id':1})

    features = [Feature(
        geometry = Point([i['coordinates'][1], i['coordinates'][0]]),
        properties={'title': i['event_name']}
        )
    for i in events_q if i['coordinates'][0]]

    fc = FeatureCollection(features)

    return make_response(geojson.dumps(fc), 200)

# Update Amount of Funding
@app.route('/update/funding', methods=['GET'])
def donate():
    params = request.args
    eventid = str(params['event_id'])
    donation = float(params['donation'])
    # Previous Funding
    prev = events.find_one({'_id': ObjectId(eventid)}, {'funds':1})
    
    # Update Number
    update = {
        'funds' : prev['funds'] + donation
    }

    events.find_one_and_update({'_id' : ObjectId(eventid)}, {'$set': update})

    msg = {'message': 'Funding Updated', 'code' : 'Success'}
    resp = make_response(jsonify(msg), 201)
    return resp

# Email User to Volunteer
@app.route('/volunteer', methods=['GET'])
def volunteer():
    params = request.args
    host_email_q = users.find_one({'name': params['host_name']})
    host_email = host_email_q['email']

    volunteer = params['volunteer_name']
    volunteer_mail = params['volunteer_mail']
    volunteer_msg = params['volunteer_msg']

    email_msg = '<h3>Someone Would Like to Volunteer</h3><p>Name: ' + str(volunteer) + '<br> Email: ' + str(volunteer_mail) + '</p><br><p>' + str(volunteer_msg) + '</p>'
    send_email(host_email, 'Public Potluck - Volunteer', email_msg)
    msg = {'message': 'Email Sent', 'code' : 'Success'}
    resp = make_response(jsonify(msg), 201)
    return resp

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)