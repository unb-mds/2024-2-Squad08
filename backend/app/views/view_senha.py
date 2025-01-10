from flask import request, jsonify
from werkzeug.security import generate_password_hash
from .models import Usuario
from . import db
from flask_mail import Message
from . import mail
import re
from flask import Blueprint

senha_bp = Blueprint('senha', __name__)

@senha_bp.route('/reset_password', methods=['POST'])
def reset_password():
    email = request.json.get('email')
    new_password = request.json.get('new_password')
    confirm_password = request.json.get('confirm_password')

    if not email or not new_password or not confirm_password:
        return jsonify({"error": "Preencha todos os campos!"}), 400

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"error": "Email inválido!"}), 400

    if new_password != confirm_password:
        return jsonify({"error": "As senhas não conferem!"}), 400

    user = Usuario.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Usuário não encontrado!"}), 404

    user.password = generate_password_hash(new_password)
    db.session.commit()

    msg = Message('Senha Redefinida com Sucesso', recipients=[email])
    msg.body = 'Sua senha foi alterada com sucesso.'
    mail.send(msg)

    return jsonify({"message": "Senha redefinida com sucesso!"}), 200
