from flask import Blueprint, jsonify, current_app, request
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
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
from flask import jsonify, request
from flask import current_app
from .geojson import load_ra_geometries
from shapely.geometry import Point

obra_bp = Blueprint('obras', __name__)

def parse_wkt_to_coordinates(geometry_string: str) -> Optional[Tuple[float, float]]:
    try:
        if not geometry_string:
            return None
            
        try:
            geometry_binary = unhexlify(geometry_string)
            geometry = wkb.loads(geometry_binary)
        except Exception:
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
        obras = db.session.query(Obra).all()  
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
        import traceback
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
        print("Starting get_obras_coordinates function")  # Debug print
        obras = db.session.query(Obra).all()  # Changed from Obra.query.all()
        print(f"Found {len(obras)} obras")  # Debug print
        
        coordinates_list = []
        for obra in obras:
            if obra.geometria:
                coords = parse_wkt_to_coordinates(obra.geometria)
                if coords:
                    coordinates_list.append({
                        'id': obra.id,
                        'nome': obra.nome,
                        'latitude': coords[0],
                        'longitude': coords[1],
                        'tipo': obra.tipo,
                        'situacao': obra.situacao,
                        'executores': obra.executores,
                        'valorInvestimentoPrevisto': obra.valorInvestimentoPrevisto,
                        'original_wkt': obra.geometria
                    })
        
        return jsonify({
            'success': True,
            'count': len(coordinates_list),
            'data': coordinates_list
        })
        
    except Exception as e:
        import traceback
        print(f"Error in get_obras_coordinates: {str(e)}")
        print("Traceback:")
        print(traceback.format_exc())  # This will print the full stack trace

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
                'executores': obra.executores,
                'valorInvestimentoPrevisto': obra.valorInvestimentoPrevisto,
                'original_wkt': obra.geometria
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
    


@obra_bp.route('/filterExec', methods=['GET'])
@cross_origin()
def filter_obras():
    try:
        tipos = request.args.getlist('tipo')  
        situacao = request.args.get('situacao')
        valores = request.args.getlist('valores[]')
        executores = request.args.get('executores')  

        query = Obra.query

        if tipos:  
            query = query.filter(Obra.tipo.in_(tipos))
        if situacao:
            query = query.filter(Obra.situacao == situacao)
        if executores:
            executores = executores.strip().lower().replace('"', '')
            query = query.filter(db.func.lower(Obra.executores).contains(executores))

        if valores:
            valor_filters = []
            for value in valores:
                if value == 'cem':
                    valor_filters.append(Obra.valorInvestimentoPrevisto <= 100000)
                elif value == 'duzentos':
                    valor_filters.append(Obra.valorInvestimentoPrevisto <= 200000)
                elif value == 'trezentos':
                    valor_filters.append(Obra.valorInvestimentoPrevisto <= 300000)
                elif value == 'quinhentos':
                    valor_filters.append(Obra.valorInvestimentoPrevisto <= 500000)
                elif value == 'setecentos':
                    valor_filters.append(Obra.valorInvestimentoPrevisto <= 700000)
                elif value == 'novecentos':
                    valor_filters.append(Obra.valorInvestimentoPrevisto <= 900000)
                elif value == 'milhao':
                    valor_filters.append(Obra.valorInvestimentoPrevisto > 1000000)
            
            if valor_filters:
                query = query.filter(db.or_(*valor_filters))

        filtered_obras = query.all()

        obras_list = []
        for obra in filtered_obras:
 
            coords = parse_wkt_to_coordinates(obra.geometria)
            if not coords:
                continue

            obra_dict = {
                'id': obra.id,
                'nome': obra.nome,
                'valorInvestimentoPrevisto': obra.valorInvestimentoPrevisto,
                'situacao': obra.situacao,
                'tipo': obra.tipo,
                'executor': obra.executores, 
                'latitude': coords[0],
                'longitude': coords[1]
            }
            obras_list.append(obra_dict)

        return jsonify({'success': True, 'data': obras_list})

    except Exception as e:
        print(f"Error in filter_obras: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500


@obra_bp.route('/executores', methods=['GET'])
@cross_origin()
def get_executores():
    try:
        # Vai buscar os executores que nao sejam iguais, se eu não me engano tem uns 60
        executores = db.session.query(Obra.executores.distinct()).all()
        # Remove aspas duplas e formata a lista, pois no banco os executores estão entre aspas duplas
        executores = [e[0].replace('"', '') for e in executores]
        return jsonify({'success': True, 'data': executores})
    except Exception as e:
        print(f"Error in get_executores: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

# esse endpoint puxa todos os tipos(distintos) de obras que tem no banco
@obra_bp.route('/tipos', methods=['GET'])
@cross_origin()
def get_tipos():
    try:
        tipos = db.session.query(Obra.tipo.distinct()).all()
        
        tipos = [t[0] for t in tipos] 
        
        return jsonify({'success': True, 'data': tipos})
    
    except Exception as e:
        print(f"Error in get_tipos: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500
    
@obra_bp.before_app_first_request
def setup_ra_geometries():
    current_app.config['RA_GEOMETRIES'] = load_ra_geometries()


@obra_bp.route('/filterRegion', methods=['GET'])
@cross_origin()
def filter_by_region():
    try:
        
        regions = request.args.getlist('regions')
        if not regions:
            regions = request.args.getlist('regions[]')
        if not regions:
            return jsonify({'success': False, 'error': 'Nenhuma região foi selecionada'}), 400

        # Função de normalização (pode ser importada ou redefinida aqui)
        def normalize_region_name(region: str) -> str:
            return "".join(region.split()).lower()
        
        # Normaliza os valores recebidos
        regions = [normalize_region_name(r) for r in regions]

        
        ra_geometries = current_app.config.get('RA_GEOMETRIES')
        if not ra_geometries:
            return jsonify({'success': False, 'error': 'GeoJSON das RA não foi carregado'}), 500

        obras = Obra.query.all()
        filtered_obras = []

        for obra in obras:
            if not obra.geometria:
                continue
            # converte a geometria para coordenadas (latitude, longitude)
            coords = parse_wkt_to_coordinates(obra.geometria)
            if not coords:
                continue


            point = Point(coords[1], coords[0])  # (lon, lat)

            # verifica se o ponto tá contido em alguma das regiões selecionadas
            for region in regions:
                polygon = ra_geometries.get(region)
                if polygon and polygon.contains(point):
                    filtered_obras.append({
                        'id': obra.id,
                        'nome': obra.nome,
                        'valorInvestimentoPrevisto': obra.valorInvestimentoPrevisto,
                        'situacao': obra.situacao,
                        'tipo': obra.tipo,
                        'executor': obra.executores,
                        'latitude': coords[0],
                        'longitude': coords[1]
                    })
                    break  # Se estiver dentro de uma das regiões selecionadas, não precisa testar as demais

        return jsonify({'success': True, 'data': filtered_obras})
    except Exception as e:
        print(f"Error in filter_by_region: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500
