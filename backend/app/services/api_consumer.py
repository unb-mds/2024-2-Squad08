from datetime import datetime
import requests
from typing import List, Dict, Any, Optional
from sqlalchemy.exc import SQLAlchemyError
from ..models import db
from ..models.obra import Obra

class ObraAPIConsumer:
    BASE_URL = 'https://api.obrasgov.gestao.gov.br/obrasgov/api/projeto-investimento'
    
    def fetch_obras(self, uf: str, page: int = 0, page_size: int = 1500) -> Optional[List[Dict[str, Any]]]:

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

    def _determine_tipo(self, obra_data: Dict[str, Any]) -> str:

        natureza = obra_data.get('natureza', '').lower()
        
        if 'obra' in natureza:
            return 'Obra'
        elif 'projeto' in natureza:
            return 'Projeto'
        elif 'outros' in natureza:
            return 'Outros'
        
        nome = obra_data.get('nome', '').lower()
        if any(word in nome for word in ['construção', 'reforma', 'pavimentação', 'implantação']):
            return 'Obra'
        elif any(word in nome for word in ['projeto', 'estudo', 'planejamento']):
            return 'Projeto'
        
        return 'Outros'

    def _extract_valor_investimento(self, fontes_recurso: List[Dict[str, Any]]) -> float:

        if not fontes_recurso:
            return 0.0
            
        total = 0.0
        for fonte in fontes_recurso:
            valor = fonte.get('valorInvestimentoPrevisto', 0.0)
            if isinstance(valor, (int, float)):
                total += float(valor)
        return total

    def _determine_origem_recurso(self, fontes_recurso: List[Dict[str, Any]]) -> str:

        if not fontes_recurso:
            return "Não informada"
            
        origens = set(fonte.get('origem', '').lower() for fonte in fontes_recurso if fonte.get('origem'))
        
        if 'federal' in origens:
            return 'Federal'
        elif 'estadual' in origens:
            return 'Estadual'
        elif 'municipal' in origens:
            return 'Municipal'
        else:
            return 'Não informada'

    def _sanitize_endereco(self, endereco: Optional[str]) -> str:
  
        if not endereco:
            return "Endereço não informado"
        return endereco

    def _sanitize_empregos_gerados(self, value: Any) -> int:

        if value is None:
            return 0
        try:
            return int(value)
        except (ValueError, TypeError):
            return 0

    def save_to_database(self, obras_data: List[Dict[str, Any]]) -> Dict[str, Any]:

        success_count = 0
        error_count = 0
        errors = []

        for obra_data in obras_data:
            try:
                data_inicial = obra_data.get('dataInicialPrevista')
                data_final = obra_data.get('dataFinalPrevista')
                
                fontes_recurso = obra_data.get('fontesDeRecurso', [])
                if isinstance(fontes_recurso, str):
                    import json
                    fontes_recurso = json.loads(fontes_recurso)
                
                valor_investimento = self._extract_valor_investimento(fontes_recurso)
                
                origem_recurso = self._determine_origem_recurso(fontes_recurso)
                
                geometrias = obra_data.get('geometrias', [])
                
                obra_dict = {
                    'nome': obra_data.get('nome'),
                    'uf': obra_data.get('uf'),
                    'situacao': obra_data.get('situacao', 'Não informada'),
                    'tipo': self._determine_tipo(obra_data),
                    'executores': obra_data.get('executores', []),
                    'natureza': obra_data.get('natureza', 'Não informada'),
                    'endereco': self._sanitize_endereco(obra_data.get('endereco')),
                    'funcaoSocial': obra_data.get('funcaoSocial', 'Não informada'),
                    'dataInicialPrevista': datetime.strptime(data_inicial, '%Y-%m-%d').date() if data_inicial else None,
                    'dataFinalPrevista': datetime.strptime(data_final, '%Y-%m-%d').date() if data_final else None,
                    'fontesDeRecurso': fontes_recurso,
                    'valorInvestimentoPrevisto': valor_investimento,
                    'origemRecurso': origem_recurso,
                    'qdtEmpregosGerados': self._sanitize_empregos_gerados(obra_data.get('qdtEmpregosGerados')),
                    'geometria': geometrias  
                }

                existing_obra = Obra.query.filter_by(nome=obra_dict['nome']).first()
                
                if existing_obra:
                    for key, value in obra_dict.items():
                        setattr(existing_obra, key, value)
                else:
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