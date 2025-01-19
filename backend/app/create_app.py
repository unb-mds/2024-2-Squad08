# create_app
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
        'postgresql://postgres:admin@localhost:5432/monitorabsb')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    print(f"Initializing app with database URL: {app.config['SQLALCHEMY_DATABASE_URI']}")
    
    db.init_app(app)
    
    with app.app_context():
        try:
            from app.models.obra import Obra
            count = Obra.query.count()
            print(f"Current obra count at startup: {count}")
        except Exception as e:
            print(f"Error checking database at startup: {e}")
    
    app.register_blueprint(main)
    
    return app