from typing import Dict, Any
from .api_consumer import ObraAPIConsumer

class ObraService:
    def __init__(self, api_consumer: ObraAPIConsumer):
        self.api_consumer = api_consumer

    def sync_obras_for_uf(self, uf: str) -> Dict[str, Any]:
        """
        Synchronize obras for a specific UF
        """
        obras_data = self.api_consumer.fetch_obras(uf)
        if not obras_data:
            return {
                'success_count': 0,
                'error_count': 1,
                'errors': ['Failed to fetch data from API']
            }
            
        return self.api_consumer.save_to_database(obras_data)