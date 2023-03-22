import requests
from creds import NINJA_KEY

api_url = 'https://api.api-ninjas.com/v1/imagetotext'
image_file_descriptor = open('apps/home/download.jpeg', 'rb')
files = {'image': image_file_descriptor}


r = requests.post(api_url, headers={'X-Api-Key': NINJA_KEY}, files=files)

for text in r.json():
    print(text['text'])


# print(r.json())
