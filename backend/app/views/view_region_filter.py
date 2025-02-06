from flask import Blueprint, jsonify, request
from app.models.obra import Obra
from app.models import db
from app.serializers.obra_serializer import ObraSchema

url = "https://api.correios.com.br/cep/v1/enderecos"

params = {
       "cep": "70002900"
   }
headers = {
       "Authorization": "Bearer SEU_TOKEN_AQUI"
   }

response = requests.get(url, params=params, headers=headers)

if response.status_code == 200:
    dados_cep = response.json()
    print(dados_cep)
else:
    print(f"Erro: {response.status_code}")
    print(response.text)