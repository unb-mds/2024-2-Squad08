from celery import Celery
from app import create_app

def make_celery(app):
    celery = Celery(app.import_name, backend=app.config['RESULT_BACKEND'], broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    return celery

app = create_app()
celery = make_celery(app)