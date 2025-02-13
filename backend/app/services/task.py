from celery import shared_task
from flask_mail import Mail, Message
from flask import current_app
from app.models import db, Obra, usuario
from datetime import datetime, timedelta

email = Mail()

@shared_task
def send_weekly_obras_email():
    with current_app.app_context():
        one_week_ago = datetime.now() - timedelta(days=7)
        new_obras = Obra.query.filter(Obra.created_at >= one_week_ago).all() 

        if new_obras:
            assunto = "Novas Obras na Semana"
            destinatario = usuario.query.filter(usuario.email).all()
            corpo = "Novas obras adicionadas:\n\n"

            for obra in new_obras:
                corpo += f"Nome: {obra.nome}, Tipo: {obra.tipo}, Situacao: {obra.situacao}\n"

            mensagem = Message(assunto=assunto, recipients=destinatario, body=corpo)
            email.send(mensagem)