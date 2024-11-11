from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from .db_models import User, db  

main = Blueprint('main', __name__)

@main.route("/users/create", methods=['GET', 'POST'])
def create_user():
    if request.method == 'POST':
        try:
            username = request.form['username']
            password = request.form['password']
            email = request.form['email']
            # Convert string 'false'/'true' to boolean
            admin = request.form.get('admin', 'false').lower() == 'true'
            
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
            
            user = User(username=username, password=hashed_password, email=email, admin=admin)
            db.session.add(user)
            db.session.commit()  
            return redirect(url_for('main.login'))
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

@main.route("/users/login", methods=['GET', 'POST'])
def login(): 
    if request.method == 'POST': 
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password): 
            return "Login successful", 200
        else: 
            return "Invalid credentials", 401