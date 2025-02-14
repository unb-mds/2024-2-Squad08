import pytest
from datetime import datetime
from app.models import Obra, Usuario
from app.services.task import send_weekly_obras_email
from unittest.mock import patch

@pytest.fixture
def mock_obras(session):
    # Create test obra with all required fields
    obra = Obra(
        nome="Test Obra",
        tipo="Test Type",
        situacao="Em andamento",
        uf="DF",
        executores="Test Executor",
        natureza="Test Nature",
        endereco="Test Address",
        funcaoSocial="Test Function",
        fontesDeRecurso={"fonte": "Test Source"},
        valorInvestimentoPrevisto=1000.00,
        origemRecurso="Test Origin",
        qdtEmpregosGerados=10,
        created_at=datetime.now()
    )
    session.add(obra)
    
    # Create test user with required fields
    user = Usuario(
        email="test@example.com",
        username="testuser",
        password="testpass"  # Add required password field
    )
    session.add(user)
    session.commit()
    return obra

def test_send_weekly_obras_email(mock_obras, client):
    with patch('app.services.envia_email.enviar_email') as mock_send:
        # Execute task
        send_weekly_obras_email()
        
        # Verify email was sent
        assert mock_send.called