import requests
import json

# Define the JSON data you want to send in the request
json_data = {'body': 'Hello, how are you?'}

# Set the content type as JSON
headers = {'Content-Type': 'application/json'}

# Send a POST request to the speak_route() function with the JSON data
response = requests.post('http://127.0.0.1:5000/speak', data=json.dumps(json_data), headers=headers)

# Get the response as a JSON object
response_json = response.json()

# Print the audio content and text result from the response
print(response_json['audioContent'])
print(response_json['textResult'])
