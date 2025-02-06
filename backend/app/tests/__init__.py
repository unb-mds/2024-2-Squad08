from flask import Flask
from app.config import config
from app.models import db

def create_app(config_name="default"):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)

    return app
