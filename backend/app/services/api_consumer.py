# app/services/api_consumer.py
from datetime import datetime
import requests
from typing import List, Dict, Any, Optional
from sqlalchemy.exc import SQLAlchemyError
from ..models import db
from ..models.obra import Obra

class ObraAPIConsumer:
    BASE_URL = 'https://api.obrasgov.gestao.gov.br/obrasgov/api/projeto-investimento'
    
    def fetch_obras(self, uf: str, page: int = 0, page_size: int = 10) -> Optional[List[Dict[str, Any]]]:
        """
        Fetch obras data from the API
        """
        params = {
            'uf': uf.upper(),
            'pagina': page,
            'tamanhoDaPagina': page_size
        }
        
        try:
            response = requests.get(self.BASE_URL, params=params)
            
            if response.status_code != 200:
                print(f"Error fetching data: {response.text}")
                return None
                
            data = response.json()
            return data.get('content', [])
            
        except requests.RequestException as e:
            print(f"Request error: {str(e)}")
            return None

    def save_to_database(self, obras_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Save obras data to database
        """
        success_count = 0
        error_count = 0
        errors = []

        for obra_data in obras_data:
            try:
                obra_dict = {
                    'nome': obra_data.get('nome'),
                    'uf': obra_data.get('uf'),
                    'situacao': obra_data.get('situacao'),
                    'tipo': obra_data.get('tipo'),
                    'executores': obra_data.get('executores'),
                    'natureza': obra_data.get('natureza'),
                    'endereco': obra_data.get('endereco'),
                    'funcaoSocial': obra_data.get('funcaoSocial'),
                    'dataInicialPrevista': datetime.strptime(obra_data.get('dataInicialPrevista'), '%Y-%m-%d').date() if obra_data.get('dataInicialPrevista') else None,
                    'dataFinalPrevista': datetime.strptime(obra_data.get('dataFinalPrevista'), '%Y-%m-%d').date() if obra_data.get('dataFinalPrevista') else None,
                    'fontesDeRecurso': obra_data.get('fontesDeRecurso'),
                    'valorInvestimentoPrevisto': obra_data.get('valorInvestimentoPrevisto'),
                    'origemRecurso': obra_data.get('origemRecurso'),
                    'qdtEmpregosGerados': obra_data.get('qdtEmpregosGerados'),
                    'geometria': obra_data.get('geometria')
                }

                obra = Obra(**obra_dict)
                db.session.add(obra)
                db.session.commit()
                success_count += 1
                
            except SQLAlchemyError as e:
                db.session.rollback()
                error_count += 1
                errors.append(f"Database error for obra {obra_data.get('nome', 'unknown')}: {str(e)}")
            
            except Exception as e:
                db.session.rollback()
                error_count += 1
                errors.append(f"Processing error for obra {obra_data.get('nome', 'unknown')}: {str(e)}")

        return {
            'success_count': success_count,
            'error_count': error_count,
            'errors': errors
        }