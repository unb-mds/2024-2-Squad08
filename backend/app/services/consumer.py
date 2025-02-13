import sys
import os
from dotenv import load_dotenv
import pika
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Add the parent directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from app.models import usuario

# Load environment variables from .env file
load_dotenv()

EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = os.getenv('EMAIL_PORT')
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')

RABBITMQ_HOST = os.getenv('RABBITMQ_HOST')
RABBITMQ_PORT = os.getenv('RABBITMQ_PORT')
RABBITMQ_USER = os.getenv('RABBITMQ_USER')
RABBITMQ_PASSWORD = os.getenv('RABBITMQ_PASSWORD')

print(f"RABBITMQ_HOST: {RABBITMQ_HOST}")
print(f"RABBITMQ_PORT: {RABBITMQ_PORT}")
print(f"RABBITMQ_USER: {RABBITMQ_USER}")
print(f"RABBITMQ_PASSWORD: {RABBITMQ_PASSWORD}")

def send_email_to_all_users(subject, body):
    users = usuario.query.all()

    for user in users:
        to_email = user.email

        msg = MIMEMultipart()
        msg['From'] = EMAIL_HOST_USER
        msg['To'] = to_email
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_HOST_USER, to_email, text)
        server.quit()

def callback(ch, method, properties, body):
    print(f" [x] Received {body}")
    send_email_to_all_users("Test Subject", body.decode())

def consume_messages():
    credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASSWORD)
    parameters = pika.ConnectionParameters(RABBITMQ_HOST, RABBITMQ_PORT, '/', credentials)
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    channel.queue_declare(queue='email_queue')

    channel.basic_consume(queue='email_queue', on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == "__main__":
    consume_messages()