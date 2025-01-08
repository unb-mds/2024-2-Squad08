from datetime import datetime, date
import requests
from typing import List, Dict, Any, Optional
from sqlalchemy.exc import SQLAlchemyError
from ..models import db
from ..models.obra import Obra

class ObraAPIConsumer:
    BASE_URL = 'https://api.obrasgov.gestao.gov.br/obrasgov/api/projeto-investimento'
    
    class QueryParams:
        def __init__(
            self,
            uf: str = 'df',
            id_unico: Optional[str] = None,
            situacao: Optional[str] = None,
            codigo_organizacao: Optional[int] = None,
            nome_organizacao: Optional[str] = None,
            data_cadastro: Optional[str] = None,
            natureza: Optional[str] = None,
            pagina: int = 0,
            tamanho_da_pagina: int = 10
        ):
            self.uf = uf.upper()
            self.id_unico = id_unico
            self.situacao = situacao
            self.codigo_organizacao = codigo_organizacao
            self.nome_organizacao = nome_organizacao
            self.data_cadastro = data_cadastro
            self.natureza = natureza
            self.pagina = pagina
            self.tamanho_da_pagina = tamanho_da_pagina

        def to_dict(self) -> Dict[str, Any]:
            params = {
                'uf': self.uf,
                'pagina': self.pagina,
                'tamanhoDaPagina': self.tamanho_da_pagina
            }
            
            # Add optional parameters only if they are not None
            if self.id_unico:
                params['idUnico'] = self.id_unico
            if self.situacao:
                params['situacao'] = self.situacao
            if self.codigo_organizacao:
                params['codigoOrganizacao'] = self.codigo_organizacao
            if self.nome_organizacao:
                params['nomeOrganizacao'] = self.nome_organizacao
            if self.data_cadastro:
                params['dataCadastro'] = self.data_cadastro
            if self.natureza:
                params['natureza'] = self.natureza
                
            return params

    # ... (keep all the static methods unchanged) ...

    def fetch_obras(self, uf: str) -> Optional[List[Dict[str, Any]]]:
        """
        Fetch obras data for a specific UF
        """
        query_params = self.QueryParams(uf=uf, tamanho_da_pagina=100)  # Increased page size
        
        try:
            response = requests.get(
                self.BASE_URL,
                params=query_params.to_dict()
            )
            response.raise_for_status()
            data = response.json()
            
            # Extract content from response
            return data.get('content', [])
        except requests.RequestException as e:
            print(f"Error fetching data: {e}")
            return None

    def save_to_database(self, obras_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Save obras data to database with improved error handling
        """
        if not obras_data:
            return {
                'success_count': 0,
                'error_count': 0,
                'errors': ['No data provided to save']
            }

        success_count = 0
        error_count = 0
        errors = []

        for obra_data in obras_data:
            try:
                # Format the data
                formatted_data = self.format_obra_data(obra_data)
                
                # Check if obra already exists
                existing_obra = Obra.query.filter_by(
                    nome=formatted_data['nome'],
                    uf=formatted_data['uf']
                ).first()
                
                if existing_obra:
                    # Update existing obra
                    for key, value in formatted_data.items():
                        setattr(existing_obra, key, value)
                else:
                    # Create new obra
                    obra = Obra(**formatted_data)
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