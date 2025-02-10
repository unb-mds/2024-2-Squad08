import pytest
from app.models import db
from app.models.obra import Obra

def test_list_obras(client, session):
    obra_data = {
        "nome": "Obra Teste",
        "uf": "SP",
        "situacao": "Em andamento",
        "tipo": "tipo Teste",
        "executores": "Executor teste",
        "natureza": "Natureza teste",
        "endereco": "Endereco Teste",
        "funcaoSocial": "Funcao Social Teste",
        "dataInicialPrevista": None,
        "dataFinalPrevista": None,
        "fontesDeRecurso": {"fonte": "Fontes de Recursos Teste"},
        'origemRecurso': 'origem test',
        "valorInvestimentoPrevisto": 1000.00,
        "qdtEmpregosGerados": 10,
        "geometria": None
    }

    obra = Obra(**obra_data)
    session.add(obra)
    session.commit()

    response = client.get("/obras")

    assert response.status_code == 200
    response_json = response.get_json()
    assert isinstance(response_json, list)
    assert len(response_json) > 0
    assert response_json[0]['nome'] == obra_data['nome']

def test_coordinates(client, session):
    obra_data = {
        "nome": "Obra Teste",
        "uf": "SP",
        "situacao": "Em andamento",
        "tipo": "tipo Teste",
        "executores": "Executor teste",
        "natureza": "Natureza teste",
        "endereco": "Endereco Teste",
        "funcaoSocial": "Funcao Social Teste",
        "dataInicialPrevista": None,
        "dataFinalPrevista": None,
        "fontesDeRecurso": {"fonte": "Fontes de Recursos Teste"},
        "origemRecurso": "origem test",
        "valorInvestimentoPrevisto": 1000.00,
        "qdtEmpregosGerados": 10,
        "geometria": "POINT(10.0 10.0)"
    }

    obra = Obra(**obra_data)
    session.add(obra)
    session.commit()

    response = client.get("/obras/coordinates")

    assert response.status_code == 200
    response_json = response.get_json()
    assert response_json['success'] is True
    assert len(response_json['data']) > 0
    
    first_obra = response_json['data'][0]
    assert first_obra['nome'] == obra_data['nome']
    assert first_obra['latitude'] == 10.0
    assert first_obra['longitude'] == 10.0
    assert first_obra['tipo'] == obra_data['tipo']
    assert first_obra['situacao'] == obra_data['situacao']
    assert first_obra['executores'] == obra_data['executores']
    assert first_obra['valorInvestimentoPrevisto'] == obra_data['valorInvestimentoPrevisto']