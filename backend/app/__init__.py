from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS  
from sqlalchemy import inspect
from .models import db
from .views.main import main_bp
from .views.view_usuario import usuario_bp
from .views.view_obra import obra_bp  
from .views.view_endereco import endereco_bp  
from dotenv import load_dotenv
from flask_migrate import Migrate, upgrade  
import os
from datetime import timedelta
from app.config import config  

def create_app(config_name="default"):
    load_dotenv() 
    
    app = Flask(__name__)
    
    if config_name != 'testing':
        CORS(app, resources={r"/*": {"origins": "*"}})
    
    app.config.from_object(config[config_name])
    
    if config_name != 'testing':
        app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', '123') 
        app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7) 
        jwt = JWTManager(app)
    
    db.init_app(app)
    
    if config_name != 'testing':
        migrate = Migrate(app, db)
        with app.app_context():
            upgrade()

    app.register_blueprint(main_bp) 
    app.register_blueprint(obra_bp, url_prefix='/obras')  
    app.register_blueprint(usuario_bp, url_prefix='/usuario')
    app.register_blueprint(endereco_bp, url_prefix='/endereco')
    
    return app