from flask import Flask
from .models import db
from .views.main import main_bp
from .views.view_user import user_bp 
from .views.view_obra import obra_bp  
from dotenv import load_dotenv
import os
from sqlalchemy.exc import SQLAlchemyError
import logging

def create_app():
    load_dotenv() 
    
    app = Flask(__name__)
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