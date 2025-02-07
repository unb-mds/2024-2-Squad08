import pytest
from app import create_app
from app.models import db
from sqlalchemy.orm import Session

@pytest.fixture(scope='session')
def app():
    """Create and configure a new app instance for each test session."""
    app = create_app('testing')
    
    app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'postgresql://postgres:password@postgres_db:5432/monitorabsb'
    })
    
    with app.app_context():
        # Create all tables
        db.create_all()
        yield app
        # Clean up
        db.session.close()
        db.drop_all()

@pytest.fixture
def client(app):
    """Create a test client for the app."""
    return app.test_client()

@pytest.fixture(autouse=True)
def session(app):
    """Create a new database session for each test."""
    with app.app_context():
        # Create a new connection and transaction
        connection = db.engine.connect()
        transaction = connection.begin()
        
        # Create a new session
        session = Session(bind=connection)
        
        # Begin a nested transaction (using SAVEPOINT)
        nested = connection.begin_nested()
        
        # If the application code calls session.commit, it will be rolled back
        # to the SAVEPOINT created above
        @db.event.listens_for(session, 'after_transaction_end')
        def end_savepoint(session, transaction):
            nonlocal nested
            if not nested.is_active:
                nested = connection.begin_nested()
        
        # Use the session in the tests
        old_session = db.session
        db.session = session
        
        yield session
        
        # Cleanup
        session.close()
        transaction.rollback()
        connection.close()
        db.session = old_session