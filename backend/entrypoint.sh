#!/bin/bash
set -e

echo "Waiting for postgres..."
until PGPASSWORD=password psql -h postgres -U postgres -d monitorabsb -c '\q' 2>/dev/null; do
    echo "Postgres is unavailable - sleeping"
    sleep 2
done

echo "Postgres is up - executing migrations"

cd /app

# Ensure migrations directory exists with proper permissions
mkdir -p /app/migrations
chmod 777 /app/migrations

# Initialize migrations if needed
if [ ! -f "/app/migrations/alembic.ini" ]; then
    flask db init
fi

# Generate and apply migrations
flask db migrate -m "Initial migration"
flask db upgrade

echo "Starting Flask application..."
exec flask run --host=0.0.0.0 --port=5000