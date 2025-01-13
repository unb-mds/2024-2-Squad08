from flask_mail import Mail, Message
from flask import current_app

email = Mail()

def envia_email(assunto, destinatario, corpo):
    with current_app.app_context():
        mensagem = Message(assunto=assunto, recipients=destinatario, body=corpo)
        email.send(mensagem)
