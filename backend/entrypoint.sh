#!/bin/bash

set -e

echo "Waiting for postgres..."
while ! pg_isready -h postgres_db -p 5432 -U postgres; do
    echo "Postgres is unavailable - sleeping"
    sleep 1
done

echo "Postgres is up - executing migrations"

if [ ! -d "migrations" ]; then
    echo "Initializing migrations directory..."
    flask db init
fi

echo "Generating migrations..."
flask db migrate -m "Initial migration"

echo "Applying migrations..."
flask db upgrade

echo "Starting Flask application..."
exec flask run --host=0.0.0.0 --port=5000