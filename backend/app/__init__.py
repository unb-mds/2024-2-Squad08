# app/__init__.py
from flask import Flask
from .models import db 
from .views import main
from dotenv import load_dotenv
import os
from sqlalchemy.exc import SQLAlchemyError
import logging

def create_app():
    load_dotenv() 
    
    app = Flask(__name__)
    app.debug = True 
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 
        'postgresql://postgres:admin@postgres_db:5432/admin')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    try:
        with app.app_context():
            db.drop_all()
            db.create_all()
            print("Tables recreated successfully")
    except SQLAlchemyError as e:
        print(f"Error recreating tables: {str(e)}")
    
    app.register_blueprint(main)
    return app