from flask import Blueprint, jsonify, request
from app.models.endereco import Endereco
from app.models import db

endereco_bp = Blueprint('endereco', __name__)

@endereco_bp.route("/endereco", methods=['POST', 'OPTIONS'])
def cadastrar_endereco():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.get_json() if request.is_json else request.form
        cep = data.get('cep')
        cidade = data.get('cidade')
        estado = data.get('estado')
        rua = data.get('rua')
        bairro = data.get('bairro')
        numero = data.get('numero')

        if not all([cep, cidade, estado, rua, bairro, numero]):
            return jsonify({'error': 'Preencha todos os campos'}), 400

        endereco = Endereco(
            cep=cep,
            cidade=cidade,
            estado=estado,
            rua=rua,
            bairro=bairro,
            numero=numero,
        )
        db.session.add(endereco)
        db.session.commit()

        return jsonify({
            'message': 'Endereço cadastrado com sucesso',
            'endereco':{
                'cep': endereco.cep,
                'cidade': endereco.cidade,
                'estado': endereco.estado,
                'rua': endereco.rua,
                'bairro': endereco.bairro,
                'numero': endereco.numero,
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Erro inesperado. Tente novamente.'}), 500
