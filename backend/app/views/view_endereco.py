from flask import Blueprint, jsonify, request
from app.models.endereco import Endereco
from app.models import db
from sqlalchemy.exc import IntegrityError
import logging

endereco_bp = Blueprint('endereco', __name__)

@endereco_bp.route("/cadastrar", methods=['POST', 'OPTIONS'])
def cadastrar_endereco():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.get_json() if request.is_json else request.form
        
        if not data:
            return jsonify({'error': 'Dados inválidos no corpo da requisição'}), 400

        required_fields = ['user_id', 'cep', 'cidade', 'estado', 'rua', 'bairro', 'numero']
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return jsonify({
                'error': 'Campos obrigatórios faltando',
                'missing_fields': missing_fields
            }), 400

        endereco = Endereco(
            user_id=data['user_id'],
            cep=data['cep'],
            cidade=data['cidade'],
            estado=data['estado'],
            rua=data['rua'],
            bairro=data['bairro'],
            numero=data['numero']
        )

        db.session.add(endereco)
        db.session.commit()

        return jsonify({
            'message': 'Endereço cadastrado com sucesso',
            'endereco': {
                'id': endereco.id,
                'user_id': endereco.user_id,
                'cep': endereco.cep,
                'cidade': endereco.cidade,
                'estado': endereco.estado,
                'rua': endereco.rua,
                'bairro': endereco.bairro,
                'numero': endereco.numero
            }
        }), 201

    except IntegrityError as e:
        db.session.rollback()
        logging.error(f"Database integrity error: {str(e)}")
        return jsonify({
            'error': 'Erro de integridade do banco de dados',
            'message': 'Usuário não encontrado ou dados duplicados'
        }), 400
    
    except ValueError as e:
        db.session.rollback()
        logging.error(f"Value error: {str(e)}")
        return jsonify({
            'error': 'Erro de validação',
            'message': str(e)
        }), 400
    
    except Exception as e:
        db.session.rollback()
        logging.error(f"Unexpected error: {str(e)}")
        return jsonify({
            'error': 'Erro interno do servidor',
            'message': 'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.'
        }), 500