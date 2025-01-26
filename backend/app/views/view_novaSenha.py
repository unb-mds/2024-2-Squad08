from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models.usuario import Usuario
from app import db, mail
from flask_mail import Message
import secrets
from datetime import datetime, timedelta

novaSenha_bp = Blueprint('novaSenha', __name__)


# Rota para enviar email de redefinição de senha
@novaSenha_bp.route("/email", methods=["POST", "OPTIONS"])
def esqueci_senha():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.get_json() if request.is_json else request.form
        email = data.get('email')
        user = Usuario.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404

        # Gerando um token único para redefinição de senha
        token = secrets.token_hex(16)
        expiration_time = datetime.utcnow() + timedelta(hours=2)

        # Armazenando o token e as datas diretamente no usuário
        user.reset_token = token
        user.token_created_at = datetime.utcnow()
        user.token_expired_at = expiration_time
        db.session.commit()

        # Enviando o link com o token para o e-mail
        reset_link = f'http://localhost:5000/senha/{token}'
        msg = Message('Redefinir sua senha', sender='no-reply@seusite.com', recipients=[email])
        msg.body = f'Clique no link para redefinir sua senha: {reset_link}'
        mail.send(msg)

        return jsonify({"message": "Link de redefinição enviado para o seu e-mail."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para redefinir a senha
@novaSenha_bp.route("/senha/<token>", methods=["POST"])
def redefinir_senha(token):
    user = Usuario.query.filter_by(reset_token=token).first()

    if not user or user.token_expired_at < datetime.utcnow():
        return jsonify({"error": "Token inválido ou expirado"}), 400

    # Pegando a nova senha do usuário
    data = request.get_json()
    new_password = data.get("new_password")
    confirm_password = data.get("confirm_password")

    if new_password != confirm_password:
        return jsonify({"error": "As senhas não conferem"}), 400

    # Atualizando a senha do usuário
    user.password = generate_password_hash(new_password)
    user.reset_token = None
    user.token_created_at = None
    user.token_expired_at = None
    db.session.commit()

    return jsonify({"message": "Senha redefinida com sucesso."}), 200
