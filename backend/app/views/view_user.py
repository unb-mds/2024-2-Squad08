from flask import Blueprint, jsonify, request, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.models.user import User
from app.models import db
from app.models.enums import GenderEnum
from flask_cors import CORS
from datetime import timedelta
from flask import jsonify, request
from typing import Tuple, Union
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
user_bp = Blueprint('user', __name__)

CORS(user_bp, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
        "expose_headers": ["Authorization"]
    }
})

@user_bp.route("/create", methods=['POST', 'OPTIONS']) 
def create_user():
    if request.method == 'OPTIONS':
        return '', 204  
        
    if request.method == 'POST':
        try:
            data = request.get_json() if request.is_json else request.form
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            admin = str(data.get('admin', False)).lower() == 'true'
            gender_str = data.get('gender', 'male').upper()

            if not all([username, password, email]):
               return jsonify({'error': 'Missing required fields'}), 400

            gender = GenderEnum[gender_str]
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
            
            user = User(
                username=username, 
                password=hashed_password, 
                email=email, 
                admin=admin,
                gender=gender
            )
            db.session.add(user)
            db.session.commit()
            
            return jsonify({
                'message': 'User created successfully',
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'gender': user.gender.value
                }
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

@user_bp.route("/login", methods=['POST', 'OPTIONS'])
@limiter.limit("5 per minute")
def login() -> Tuple[Union[str, dict], int]:
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    try:
        data = request.get_json() if request.is_json else request.form
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        user = User.query.filter_by(email=email.lower().strip()).first()
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401

        if not check_password_hash(user.password, password):
            return jsonify({'error': 'Invalid credentials'}), 401

        access_token = create_access_token(
            identity=user.id,
            expires_delta=timedelta(days=7)
        )
        
        response = jsonify({
            'message': 'Login successful',
            'token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'admin': user.admin
            }
        })
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.headers['Authorization'] = f'Bearer {access_token}'
        return response, 200
                
    except Exception as e:
        return jsonify({'error': f'Login failed: {str(e)}'}), 500