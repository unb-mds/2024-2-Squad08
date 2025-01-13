from flask import Flask
from app import db, migrate  
from create_app import create_app
from app.models.obra import Obra
from app.models.user import User
from app.models.endereco import Endereco

app = create_app()

if __name__ == '__main__':
    app.run()