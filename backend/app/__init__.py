# app/__init__.py
from flask import Flask
from .db_models import db
from .views import main
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv() 
    
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:admin@localhost:5432/admin')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
    
    app.register_blueprint(main)
    return app