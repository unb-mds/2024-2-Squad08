from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.models.usuario import Usuario
from app.models import db
from flask_cors import CORS
from datetime import timedelta
from re import match

usuario_bp = Blueprint('usuario', __name__)

CORS(usuario_bp, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@usuario_bp.route("/cadastro", methods=['POST', 'OPTIONS'])
def create_user():
    if request.method == 'OPTIONS':
        return '', 204  

    try:
        data = request.get_json() if request.is_json else request.form
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        admin = str(data.get('admin', False)).lower() == 'true'

        if not all([username, email, password]):
            return jsonify({'error': 'Preencha todos os campos'}), 400

        if not match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({'error': 'Formato de email inválido'}), 400

        if Usuario.query.filter_by(username=username).first():
            return jsonify({'error': 'Esse usuário já existe'}), 400
        if Usuario.query.filter_by(email=email).first():
            return jsonify({'error': 'Email já registrado'}), 400

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        usuario = Usuario(
            username=username,
            email=email,
            password=hashed_password,
            admin=admin,
        )
        db.session.add(usuario)
        db.session.commit()

        return jsonify({
            'message': 'Usuário criado com sucesso',
            'user': {
                'username': usuario.username,
                'email': usuario.email,
                'admin': usuario.admin,
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro inesperado. Tente novamente.'}), 500


@usuario_bp.route("/login", methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.get_json() if request.is_json else request.form
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Usário e senha requeridos'}), 400

        usuario = Usuario.query.filter(
            (Usuario.username == username) | (Usuario.email == username)
        ).first()

        if usuario and check_password_hash(usuario.password, password):
            access_token = create_access_token(
                identity=usuario.id,
                expires_delta=timedelta(days=7)
            )

            return jsonify({
                'message': 'Login bem sucedido',
                'token': access_token,
                'user': {
                    'id': usuario.id,
                    'username': usuario.username,
                    'email': usuario.email,
                    'admin': usuario.admin
                }
            }), 200

        return jsonify({'error': 'Credenciais inválidas'}), 401

    except Exception as e:
        return jsonify({'error': 'Erro inesperado. Tente novamente.'}), 500
