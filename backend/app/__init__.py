from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS  
from .models import db
from .views.main import main_bp
from .views.view_user import user_bp 
from .views.view_obra import obra_bp  
from dotenv import load_dotenv
import os
from sqlalchemy.exc import SQLAlchemyError
import logging
from datetime import timedelta

def create_app():
    load_dotenv() 
    
    app = Flask(__name__)
    
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:5173", "http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
            "expose_headers": ["Authorization"]
        }
    })
    
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key') 
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7) 
    
    jwt = JWTManager(app)

    app.config.from_object('app.config.Config')  
    
    db.init_app(app)
    
    try:
        with app.app_context():
            db.drop_all()
            db.create_all()
            print("Tables recreated successfully")
    except SQLAlchemyError as e:
        print(f"Error recreating tables: {str(e)}")
    
    app.register_blueprint(main_bp) 
    app.register_blueprint(user_bp, url_prefix='/users')  
    app.register_blueprint(obra_bp, url_prefix='/obras')  
    
    return app