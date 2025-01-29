# __init__.py 
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS  
from .models import db
from .views.main import main_bp
from .views.view_usuario import usuario_bp
from .views.view_obra import obra_bp  
from dotenv import load_dotenv
import os
from sqlalchemy.exc import SQLAlchemyError
import logging
from datetime import timedelta
from flask_apscheduler import APScheduler
from .cron import trigger, update_obras

scheduler = APScheduler()

def create_app():
    load_dotenv() 
    
    app = Flask(__name__)
    
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:5173"],  
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key') 
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7) 
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL',
        'postgresql://postgres:admin@localhost:5432/monitorabsb')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    jwt = JWTManager(app)

    app.config.from_object('app.config.Config')  
    
    db.init_app(app)
    
<<<<<<< HEAD
    # Only create tables if they don't exist
    with app.app_context():
        try:
            # Check if tables need to be created
            if not db.engine.dialect.has_table(db.engine, 'obras'):
                db.create_all()
                print("Tables created successfully")
            else:
                print("Tables already exist")
        except SQLAlchemyError as e:
            print(f"Error checking/creating tables: {str(e)}")
=======
    # try:
    #     with app.app_context():
    #         db.drop_all()
    #         db.create_all()
    #         print("Tables recreated successfully")
    # except SQLAlchemyError as e:
    #     print(f"Error recreating tables: {str(e)}")
>>>>>>> cf308fa2c13c2325143f100c9489c1d7c9260dae
    
    app.register_blueprint(main_bp) 
    app.register_blueprint(obra_bp, url_prefix='/obras')  
    app.register_blueprint(usuario_bp, url_prefix='/usuario')
    
    scheduler.init_app(app)
    scheduler.add_job(id="Update Obras", func=update_obras, args=(app.app_context,"df"), trigger=trigger)
    scheduler.start()

    return app