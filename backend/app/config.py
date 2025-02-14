import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('RABBITMQ_EMAIL_HOST')
    MAIL_PASSWORD = os.getenv('RABBITMQ_EMAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv('RABBITMQ_EMAIL_HOST')
    CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0')
    RESULT_BACKEND = os.getenv('RESULT_BACKEND', 'redis://localhost:6379/0')
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() in ['true', '1', 't']

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:admin@postgres_db:5432/admin')

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:password@postgres_db:5432/monitorabsb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "default": DevelopmentConfig
}
