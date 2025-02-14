#!/bin/sh

# Espera o banco de dados estar pronto
echo "Waiting for postgres..."
while ! nc -z postgres_db 5432; do
    sleep 1
done
echo "PostgreSQL started"

# Verifica se é a primeira execução checando se existe alguma migração
if [ ! -f "/app/migrations/versions/*.py" ]; then
    echo "Initializing database..."
    # Executa as migrações iniciais
    alembic upgrade head --config /alembic.ini
fi

# Inicia a aplicação
exec "$@"

