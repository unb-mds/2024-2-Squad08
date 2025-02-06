import pytest
from app.models import db
from app.models.endereco import Endereco

import pytest
from app.models import db
from app.models.usuario import Usuario
from werkzeug.security import check_password_hash

def test_create_user(client):

    user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword123",
        "admin": False
    }

    response = client.post("usuario/cadastro", json=user_data)

    assert response.status_code == 201
    response_json = response.get_json()

    assert response_json["message"] == "Usuário criado com sucesso"
    assert "user" in response_json
    assert response_json["user"]["username"] == user_data["username"]
    assert response_json["user"]["email"] == user_data["email"]
    assert response_json["user"]["admin"] == user_data["admin"]

    usuario = Usuario.query.filter_by(email=user_data["email"]).first()
    assert usuario is not None
    assert usuario.username == user_data["username"]
    assert check_password_hash(usuario.password, user_data["password"])


def test_cadastrar_endereco(client):

    endereco_data = {
        "user_id": 1,
        "cep": "12345-678",
        "cidade": "Cidade Teste",
        "estado": "SP",
        "rua": "Rua Teste",
        "bairro": "Bairro Teste",
        "numero": "123"
    }

    response = client.post("endereco/cadastrar", json=endereco_data)

    assert response.status_code == 201
    response_json = response.get_json()

    assert response_json["message"] == "Endereço cadastrado com sucesso"
    assert "endereco" in response_json
    assert response_json["endereco"]["cep"] == endereco_data["cep"]

    endereco = Endereco.query.filter_by(cep=endereco_data["cep"]).first()
    assert endereco is not None
