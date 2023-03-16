import imaplib
import email
from email.header import decode_header
import getpass



def get_mail_client(email_address):
    SMTP_SERVER = "imap.gmail.com"
    SMTP_PORT = 993
    
    password = "Sirdewie31!"
    # with open("password.txt", "r") as f:
    #     password = f.read().strip()


    mail = imaplib.IMAP4_SSL(SMTP_SERVER)
    mail.login(email_address, password)
    return mail

# print(get_mail_client('appiispanen@gmail.com'))



def read_emails():
    # Connect to the IMAP server and authenticate
    # Replace 'your_email@example.com' with your email address
    EMAIL = 'appiispanen@gmail.com'
    PASSWORD = getpass.getpass('Sirdewie31!')
    IMAP_SERVER = 'imap.gmail.com'  # Replace with your email provider's IMAP server
    mail = imaplib.IMAP4_SSL(IMAP_SERVER)
    mail.login(EMAIL, PASSWORD)

    # Select the mailbox (inbox) you want to read from
    mail.select('inbox')

    # Search for all emails in the selected mailbox
    _, msg_numbers = mail.search(None, 'ALL')
    msg_numbers = msg_numbers[0].split()

    # Iterate through the email messages
    for msg_number in msg_numbers:
        _, msg_data = mail.fetch(msg_number, '(RFC822)')
        msg = email.message_from_bytes(msg_data[0][1])

        subject = decode_header(msg['Subject'])[0][0]
        if isinstance(subject, bytes):
            subject = subject.decode()

        from_ = decode_header(msg['From'])[0][0]
        if isinstance(from_, bytes):
            from_ = from_.decode()

        print(f'Subject: {subject}')
        print(f'From: {from_}')

        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == 'text/plain':
                    text = part.get_payload(decode=True).decode()
                    print(f'Email body: {text}')
        else:
            text = msg.get_payload(decode=True).decode()
            print(f'Email body: {text}')

    # Close the mailbox and logout
    mail.close()
    mail.logout()

if __name__ == '__main__':
    read_emails()
