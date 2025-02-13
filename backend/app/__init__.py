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
from flask_migrate import Migrate
import os
from datetime import timedelta
from app.config import config

def create_app(config_name="default"):
    load_dotenv() 
    
    app = Flask(__name__)
    
    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL',
        'postgresql://postgres:password@postgres:5432/monitorabsb')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    if config_name != 'testing':
        CORS(app, resources={r"/*": {
            "origins": ["https://monitorabsb.mash1r0.site", "http://localhost:5173"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }})
        app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', '123') 
        app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7) 
        jwt = JWTManager(app)
    
    # Initialize extensions
    db.init_app(app)
    
    # Modificação aqui: Criar todas as tabelas se não existirem
    with app.app_context():
        db.create_all()
    
    # Initialize migrations after db
    migrate = Migrate(app, db)
    
    # Register blueprints
    app.register_blueprint(main_bp) 
    app.register_blueprint(obra_bp, url_prefix='/obras')  
    app.register_blueprint(usuario_bp, url_prefix='/usuario')
    app.register_blueprint(endereco_bp, url_prefix='/endereco')
    
    return app