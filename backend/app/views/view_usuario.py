from flask import Blueprint, jsonify, request, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.models.usuario import Usuario
from app.models import db
from datetime import timedelta
from re import match

usuario_bp = Blueprint('usuario', __name__)

@usuario_bp.route("/cadastro", methods=['POST', 'OPTIONS'])
def create_user():
    if request.method == 'OPTIONS':
        return '', 204  

    try:
        data = request.get_json() if request.is_json else request.form
        print("Received data:", data)  # Debug print
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        admin = str(data.get('admin', False)).lower() == 'true'

        if not all([username, email, password]):
            missing_fields = []
            if not username: missing_fields.append('username')
            if not email: missing_fields.append('email')
            if not password: missing_fields.append('password')
            return jsonify({
                'error': 'Preencha todos os campos',
                'missing_fields': missing_fields
            }), 400

        if not match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({'error': 'Formato de email inválido'}), 400

        existing_user = db.session.query(Usuario).filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'Esse usuário já existe'}), 400

        existing_email = db.session.query(Usuario).filter_by(email=email).first()
        if existing_email:
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
                'id': usuario.id,
                'username': usuario.username,
                'email': usuario.email,
                'admin': usuario.admin,
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        import traceback
        print(f"Error creating user: {str(e)}")
        print("Traceback:")
        print(traceback.format_exc())
        return jsonify({
            'error': 'Erro inesperado. Tente novamente.',
            'details': str(e)
        }), 500


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
