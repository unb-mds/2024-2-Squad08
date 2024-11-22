from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.user import User
from app.models import db
from app.models.enums import GenderEnum

user_bp = Blueprint('user', __name__)

@user_bp.route("/users/create", methods=['GET', 'POST'])
def create_user():
    if request.method == 'POST':
        try:
            data = request.get_json() if request.is_json else request.form
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            admin = str(data.get('admin', False)).lower() == 'true'
            gender_str = data.get('gender', 'male').upper()

            if not all([username, password, email]):
             ,   return jsonify({'error': 'Missing required fields'}), 400

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
                    'admin': user.admin,
                    'gender': user.gender.value
                }
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

@user_bp.route("/users/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        try:
            data = request.get_json() if request.is_json else request.form
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return jsonify({'error': 'Username and password are required'}), 400

            user = User.query.filter_by(username=username).first()
            if user and check_password_hash(user.password, password): 
                return jsonify({'message': 'Login successful'}), 200
            else: 
                return jsonify({'error': 'Invalid credentials'}), 401
        except Exception as e:
            return jsonify({'error': str(e)}), 500