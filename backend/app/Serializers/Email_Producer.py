import pika
import json

class EmailProducer:
    def __init__(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters('rabbitmq')
        )
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='email_notifications')

    def send_email(self, email: str, subject: str, message: str):
        data = {
            'email': email,
            'subject': subject,
            'message': message
        }
        self.channel.basic_publish(
            exchange='',
            routing_key='email_notifications',
            body=json.dumps(data)
        )