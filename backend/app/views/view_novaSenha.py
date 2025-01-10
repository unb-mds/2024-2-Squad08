from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models.cadastro import Cadastro
from app.models.novaSenha import NovaSenha
from app import db, mail
from flask_mail import Message
import secrets
from datetime import datetime, timedelta
from flask_cors import CORS

novaSenha_bp = Blueprint('novaSenha', __name__)

CORS(novaSenha_bp, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],  
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Rota para enviar email de redefinição de senha
@novaSenha_bp.route("/email", methods=["POST", "OPTIONS"])
def esqueci_senha():
    if request.method == 'OPTIONS':
        return '', 204 

    try:
        data = request.get_json() if request.is_json else request.form
        email = data.get('email')
        user = Cadastro.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        # Gerando um token único para redefinição de senha
        token = secrets.token_hex(16)  
        expiration_time = datetime.utcnow() + timedelta(hours=2) 
        
        # Armazenando o token e a data de expiração no banco de dados
        password_reset = NovaSenha(user_id=user.id, token=token, expired_at=expiration_time)
        db.session.add(password_reset)
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
    password_reset = NovaSenha.query.filter_by(token=token).first()
    
    if not password_reset or password_reset.expired_at < datetime.utcnow():
        return jsonify({"error": "Token inválido ou expirado"}), 400
    
    # Pegando o novo token de senha do usuário
    new_password = request.json.get("new_password")
    confirm_password = request.json.get("confirm_password")
    
    if new_password != confirm_password:
        return jsonify({"error": "As senhas não conferem"}), 400
    
    # Atualizando a senha do usuário
    user = Cadastro.query.get(password_reset.user_id)
    user.password = generate_password_hash(new_password)
    
    db.session.commit()
    
    # Remover o token da tabela de redefinição após uso
    db.session.delete(password_reset)
    db.session.commit()
    
    return jsonify({"message": "Senha redefinida com sucesso."}), 200
