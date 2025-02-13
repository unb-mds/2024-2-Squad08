import pytest
from app.models import db
from app.models.usuario import Usuario
from app.models.endereco import Endereco
from werkzeug.security import check_password_hash

def test_create_user(client, session):
    user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword123",
        "admin": False
    }

    response = client.post("/usuario/cadastro", json=user_data)

    assert response.status_code == 201
    response_json = response.get_json()

    assert response_json["message"] == "Usuário criado com sucesso"
    assert "user" in response_json
    assert response_json["user"]["username"] == user_data["username"]
    assert response_json["user"]["email"] == user_data["email"]
    assert response_json["user"]["admin"] == user_data["admin"]

def test_cadastrar_endereco(client, session):
    # First, make sure the database is clean
    with session.begin():
        session.query(Usuario).delete()
        session.query(Endereco).delete()
    
    user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword123",
        "admin": False
    }

    response_user = client.post("/usuario/cadastro", json=user_data)
    print("User registration response:", response_user.get_json())
    assert response_user.status_code == 201, f"Failed to create user: {response_user.get_json()}"

    # Get the user from the response data
    response_data = response_user.get_json()
    user_id = response_data['user']['id']

    endereco_data = {
        "user_id": user_id,  # Use the ID from the response
        "cep": "12345678",  # Removed hyphen to match model
        "cidade": "Cidade Teste",
        "estado": "SP",
        "rua": "Rua Teste",
        "bairro": "Bairro Teste",
        "numero": "123"
    }

    response = client.post("/endereco/cadastrar", json=endereco_data)
    print("Endereco registration response:", response.get_json())
    assert response.status_code == 201, f"Failed to create endereco: {response.get_json()}"
    
    # Verify the endereco was created
    endereco = db.session.query(Endereco).filter_by(user_id=user_id).first()
    assert endereco is not None
    assert endereco.cep == endereco_data["cep"]