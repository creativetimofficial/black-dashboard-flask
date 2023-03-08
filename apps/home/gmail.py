import os
import base64
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from email.mime.text import MIMEText

# Define the scope and credentials for accessing Gmail API
SCOPES = ['https://www.googleapis.com/auth/gmail.compose', 'https://www.googleapis.com/auth/gmail.readonly']
creds = None
if os.path.exists('token.json'):
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_config('google.json', SCOPES)
        creds = flow.run_local_server(port=0)
    with open('token.json', 'w') as token:
        token.write(creds.to_json())

# Create a Gmail API service client
service = build('gmail', 'v1', credentials=creds)

# Define the sender or search term to filter messages
query = "from:example@sender.com" # Change to your desired sender or search term

# Read messages from the specified sender or search term
try:
    messages = service.users().messages().list(userId='me', q=query).execute().get('messages', [])
    if not messages:
        print('No messages found.')
    else:
        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            print(f"From: {msg['payload']['headers'][1]['value']}")
            print(f"Subject: {msg['payload']['headers'][4]['value']}")
            print(f"Body: {base64.urlsafe_b64decode(msg['payload']['parts'][0]['body']['data']).decode('utf-8')}")
except HttpError as error:
    print(f'An error occurred: {error}')

def create_message(to, subject, message_text):
    """Create a message for sending."""
    message = MIMEText(message_text)
    message['to'] = to
    message['subject'] = subject
    return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}

def send_message(message):
    """Send an email message."""
    try:
        message = (service.users().messages().send(userId='me', body=message).execute())
        return message
    except HttpError as error:
        print(f'An error occurred: {error}')
        return None

# Send a message to a particular recipient
try:
    message = create_message('example@recipient.com', 'Example Subject', 'Example Body')
    send_message(message)
    print('Message sent successfully.')
except HttpError as error:
    print(f'An error occurred: {error}')
