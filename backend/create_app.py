from flask import Flask
from app.db_models import db
from app.views import main
from app.services.envia_email import envia_email
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL',
        'postgresql://postgres:password@localhost:5432/your_database')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    app.register_blueprint(main)
    
    return app