from flask import Flask
from .db_models import db
from .views import main
from dotenv import load_dotenv
import os
from sqlalchemy.exc import SQLAlchemyError
import logging

def create_app():
    load_dotenv() 
    
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 
        'postgresql://postgres:admin@localhost:5433/admin')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    try:
        with app.app_context():
            print("Registered models:", db.Model.registry.mappers)
            db.create_all()
            print("Tables created successfully")
            result = db.session.execute(db.text('SELECT * FROM information_schema.tables'))
            tables = [row[2] for row in result]
            print("Available tables:", tables)
    except SQLAlchemyError as e:
        print(f"Error creating tables: {str(e)}")
    
    app.register_blueprint(main)
    return app