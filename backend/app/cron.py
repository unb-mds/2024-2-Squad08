from apscheduler.triggers.cron import CronTrigger
from .services.api_consumer import ObraAPIConsumer
from .services.obra_service import ObraService

trigger = CronTrigger(hour=8, minute=1)

def update_obras(app_context, uf):
    print("before app context")
    with app_context():
        try:
            print("starting to update obras")
            consumer = ObraAPIConsumer()
            service = ObraService(consumer)
            result = service.sync_obras_for_uf(uf)
            print(result)
        
        except Exception as e:
            print(e)




