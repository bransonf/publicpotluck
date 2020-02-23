# Send an Email
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(recipient, subject, msg):
    # Email Configuration
    email_sender = 'hello@publicpotluck.com'
    email_pass = 'feedtheworld'

    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = email_sender
    message["To"] = recipient

    # Plain Text Email
    txt = "Hey, You've Got Mail from Public Potluck"

    # HTML Formatted Email
    html = '<html><head></head><body><style>@import url("https://fonts.googleapis.com/css?family=Crimson+Text&display=swap");* {    margin: 0;    padding: 0;    font-family: "Crimson Text", serif;}body {    background-color: rgb(197, 105, 30);    color: #ffffff;    text-align: center;    vertical-align: middle;    position: relative;}a {    color: #ffffff;}h1 {    font-size:3rem;}h3 {    font-size: 2rem;}p {    font-size: 1.5rem;    padding: 10px;    max-width: 80%;    margin-left: 10%;}#content {    position: absolute;    top: 50%;    left: 50%;    transform: translate(-50%, -50%);}</style><div id="content"><h1>Public Potluck</h1>'
    html = html + str(msg) + "</div></body></html>"

    part1 = MIMEText(txt, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(email_sender, email_pass)
        server.sendmail(
            email_sender, recipient, message.as_string()
        )
    return 'Success'
