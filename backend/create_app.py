from flask import Flask
from app.db_models import db
from app.views import main
from dotenv import load_dotenv
import os
from backend.app.services.api_consumer import obra_service

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.register_blueprint(obra_service, url_prefix='/api/obras')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL',
        'postgresql://postgres:password@localhost:5432/your_database')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    app.register_blueprint(main)
    
    return app