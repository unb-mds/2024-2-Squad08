from flask import Flask
from app import db, migrate
from app.views.main import main
from app.services.api_consumer import obra_service
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.register_blueprint(obra_service, url_prefix='/api/obras')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL',
        'postgresql://postgres:password@postgres:5432/monitorabsb')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    migrate.init_app(app, db)
    app.register_blueprint(main)
    
    return app