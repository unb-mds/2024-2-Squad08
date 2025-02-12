#!/bin/bash

set -e

echo "Waiting for postgres..."
while ! pg_isready -h postgres_db -p 5432 -U postgres; do
    sleep 1
done

echo "Postgres is up - executing migrations"

flask db init || true  # Initialize if not already initialized
flask db migrate -m "Initial migration" || true  # Create migration if needed
flask db upgrade  # Apply migrations

echo "Starting Flask application..."
exec flask run --host=0.0.0.0 --port=5000