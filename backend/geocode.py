import requests

def geocode(address):
    r = requests.get('https://maps.googleapis.com/maps/api/geocode/json', {
        'address' : address,
        'key' : 'AIzaSyAlzlj88QMMbVZnOotboPx3J7Q1xoSBsoM'
    })
    data = r.json()
    try:
        latitude = data['results'][0]['geometry']['location']['lat'] 
        longitude = data['results'][0]['geometry']['location']['lng']
    except:
        latitude = None
        longitude = None
    return [latitude, longitude]

