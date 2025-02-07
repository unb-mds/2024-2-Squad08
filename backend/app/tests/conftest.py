import pytest
from app import create_app
from app.models import db
from sqlalchemy.orm import Session

@pytest.fixture(scope='session')
def app():
    app = create_app('testing')
    
    app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'postgresql://postgres:password@postgres_db:5432/monitorabsb'
    })
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.close()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture(autouse=True)
def session(app):
    with app.app_context():
        connection = db.engine.connect()
        transaction = connection.begin()
        
        session = Session(bind=connection)
        
        nested = connection.begin_nested()
        
        @db.event.listens_for(session, 'after_transaction_end')
        def end_savepoint(session, transaction):
            nonlocal nested
            if not nested.is_active:
                nested = connection.begin_nested()
        
        old_session = db.session
        db.session = session
        
        yield session
        
        session.close()
        transaction.rollback()
        connection.close()
        db.session = old_session