import pika

def send_message(message):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='email_queue')

    channel.basic_publish(exchange='', routing_key='email_queue', body=message)
    print(f" [x] Sent {message}")

    connection.close()

if __name__ == "__main__":
    message = "Hello, this is a test email message."
    send_message(message)