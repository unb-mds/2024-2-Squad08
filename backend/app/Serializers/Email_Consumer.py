import pika
import json
from app.services.envia_email import enviar_email

class EmailConsumer:
    def __init__(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters('rabbitmq')
        )
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='email_notifications')

    def callback(self, ch, method, properties, body):
        data = json.loads(body)
        try:
            enviar_email(
                destinatario=data['email'],
                assunto=data['subject'],
                mensagem=data['message']
            )
            print(f"Email sent to {data['email']}")
        except Exception as e:
            print(f"Error sending email: {str(e)}")

    def start_consuming(self):
        self.channel.basic_consume(
            queue='email_notifications',
            on_message_callback=self.callback,
            auto_ack=True
        )
        print("Started consuming email messages...")
        self.channel.start_consuming()