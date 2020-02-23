from google.auth import compute_engine
from google.cloud import storage
import random
import string


# Explicit Credentials
credentials = compute_engine.Credentials()
client = storage.Client(credentials=credentials)
bucket = client.get_bucket('publicpotluck')

rand_url = ''.join(random.choice(string.ascii_letters) for i in range(30))

blob2 = bucket.blob(f'{rand_url}.txt')
print(rand_url)

blob2.upload_from_filename(filename='./test.txt')
