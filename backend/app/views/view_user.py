from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.models.user import User
from app.models import db
from flask_cors import CORS
from datetime import timedelta

user_bp = Blueprint('user', __name__)

CORS(user_bp, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
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

            if not all([username, password, email]):
               return jsonify({'error': 'Missing required fields'}), 400

            gender = GenderEnum[gender_str]
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
            
            user = User(
                username=username, 
                password=hashed_password, 
                email=email, 
                admin=admin,
            )
            db.session.add(user)
            db.session.commit()
            
            return jsonify({
                'message': 'User created successfully',
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'admin': user.admin,
                }
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

@user_bp.route("/login", methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 204

    if request.method == 'POST':
        try:
            data = request.get_json() if request.is_json else request.form
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return jsonify({'error': 'Username and password are required'}), 400

            user = User.query.filter_by(username=username).first()
            
            if user and check_password_hash(user.password, password):
                access_token = create_access_token(
                    identity=user.id,
                    expires_delta=timedelta(days=7)
                )
                
                return jsonify({
                    'message': 'Login successful',
                    'token': access_token,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'admin': user.admin
                    }
                }), 200
            else:
                return jsonify({'error': 'Invalid credentials'}), 401
                
        except Exception as e:
            return jsonify({'error': str(e)}), 500