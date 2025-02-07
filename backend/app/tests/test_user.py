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
    user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword123",
        "admin": False
    }
    
    response_user = client.post("/usuario/cadastro", json=user_data)
    assert response_user.status_code == 201
    
    usuario = db.session.query(Usuario).filter_by(email=user_data["email"]).first()
    assert usuario is not None

    endereco_data = {
        "user_id": usuario.id,
        "cep": "12345-678",
        "cidade": "Cidade Teste",
        "estado": "SP",
        "rua": "Rua Teste",
        "bairro": "Bairro Teste",
        "numero": "123"
    }

    response = client.post("/endereco/cadastrar", json=endereco_data)
    assert response.status_code == 201
    response_json = response.get_json()

    assert response_json["message"] == "Endereço cadastrado com sucesso"
    assert "endereco" in response_json
    assert response_json["endereco"]["cep"] == endereco_data["cep"]

    endereco = db.session.query(Endereco).filter_by(user_id=usuario.id).first()
    assert endereco is not None
    assert endereco.cep == endereco_data["cep"]