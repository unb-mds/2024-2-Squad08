from flask import Blueprint, jsonify, current_app
from ..services.api_consumer import ObraAPIConsumer
from ..services.obra_service import ObraService
from app.models.obra import Obra
from app.models import db
from shapely.geometry import mapping
from shapely import wkt
from typing import Optional, Tuple
from flask_cors import cross_origin
from shapely import wkt, wkb
from binascii import unhexlify

obra_bp = Blueprint('obras', __name__)

def parse_wkt_to_coordinates(geometry_string: str) -> Optional[Tuple[float, float]]:
    try:
        if not geometry_string:
            return None
            
        try:
            geometry_binary = unhexlify(geometry_string)
            geometry = wkb.loads(geometry_binary)
        except Exception:
            # If WKB parsing fails, try WKT parsing as fallback
            geometry = wkt.loads(geometry_string)
        
        if geometry.geom_type == 'POINT':
            return (geometry.y, geometry.x)
            
        centroid = geometry.centroid
        return (centroid.y, centroid.x)
        
    except (ValueError, AttributeError) as e:
        print(f"Error parsing geometry: {str(e)}")
        return None

@obra_bp.route('', methods=['GET'])
@cross_origin()
def list_obras():
    try:
        obras = Obra.query.all()
        obras_list = []
        
        for obra in obras:
            obra_dict = {
                'id': obra.id,
                'nome': obra.nome,
                'uf': obra.uf,
                'situacao': obra.situacao,
                'tipo': obra.tipo,
                'executores': obra.executores,
                'natureza': obra.natureza,
                'endereco': obra.endereco,
                'funcaoSocial': obra.funcaoSocial,
                'dataInicialPrevista': obra.dataInicialPrevista.isoformat() if obra.dataInicialPrevista else None,
                'dataFinalPrevista': obra.dataFinalPrevista.isoformat() if obra.dataFinalPrevista else None,
                'fontesDeRecurso': obra.fontesDeRecurso,
                'valorInvestimentoPrevisto': obra.valorInvestimentoPrevisto,
                'origemRecurso': obra.origemRecurso,
                'qdtEmpregosGerados': obra.qdtEmpregosGerados,
                'geometria': obra.geometria
            }
            obras_list.append(obra_dict)
            
        return jsonify(obras_list)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@obra_bp.route('/sync/<uf>', methods=['POST'])
@cross_origin()
def sync_obras(uf):
    try:
        consumer = ObraAPIConsumer()
        service = ObraService(consumer)
        result = service.sync_obras_for_uf(uf)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@obra_bp.route('/coordinates', methods=['GET'])
@cross_origin()
def get_obras_coordinates():
    try:
        obras = Obra.query.all()
        
        coordinates_list = []
        for obra in obras:
            if obra.geometria:
                print(f"Raw geometry for {obra.nome}: {obra.geometria}")  # Debug print
                coords = parse_wkt_to_coordinates(obra.geometria)
                if coords:
                    print(f"Parsed coordinates: {coords}")  # Debug print
                    coordinates_list.append({
                        'id': obra.id,
                        'nome': obra.nome,
                        'latitude': coords[0],
                        'longitude': coords[1],
                        'tipo': obra.tipo,
                        'situacao': obra.situacao,
                        'valorInvestimentoPrevisto': obra.valorInvestimentoPrevisto,
                        'original_wkt': obra.geometria
                    })
        
        return jsonify({
            'success': True,
            'count': len(coordinates_list),
            'data': coordinates_list
        })
        
    except Exception as e:
        print(f"Error in get_obras_coordinates: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@obra_bp.route('/<int:obra_id>/coordinates', methods=['GET'])
@cross_origin()
def get_obra_coordinates(obra_id: int):
    try:
        obra = Obra.query.get_or_404(obra_id)
        
        if not obra.geometria:
            return jsonify({
                'success': False,
                'error': 'No geometry data available for this obra'
            }), 404
            
        coords = parse_wkt_to_coordinates(obra.geometria)
        if not coords:
            return jsonify({
                'success': False,
                'error': 'Unable to parse geometry data'
            }), 422
            
        return jsonify({
            'success': True,
            'data': {
                'id': obra.id,
                'nome': obra.nome,
                'latitude': coords[0],
                'longitude': coords[1],
                'tipo': obra.tipo,
                'situacao': obra.situacao,
                'valorInvestimentoPrevisto': obra.valorInvestimentoPrevisto,
                'original_wkt': obra.geometria
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500