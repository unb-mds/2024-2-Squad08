import pytest
from app import create_app
from app.models import db
from app.models.usuario import Usuario
from app.models.endereco import Endereco
from app.models.obra import Obra

@pytest.fixture(scope='session')
def app():
    app = create_app('testing')
    app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'postgresql://postgres:password@postgres_db:5432/monitorabsb',
        'SQLALCHEMY_TRACK_MODIFICATIONS': False
    })
    
    with app.app_context():
        # Only create tables if they don't exist
        db.create_all()
        yield app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def session(app):
    with app.app_context():
        # Start a transaction
        connection = db.engine.connect()
        transaction = connection.begin()
        
        # Create a session bound to the connection
        session = db.session
        
        yield session
        
        # Rollback the transaction (preserves existing data)
        transaction.rollback()
        connection.close()