#!/bin/bash
set -e

echo "Starting database restore script..."

until pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

echo "PostgreSQL is ready. Checking backup file..."
if [ ! -f /docker-entrypoint-initdb.d/backup_monitorabsb_20250118.sql ]; then
    echo "Error: Backup file not found!"
    exit 1
fi

echo "Dropping existing tables..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" --set=client_encoding=UTF8 <<-EOSQL
    DROP TABLE IF EXISTS obras CASCADE;
    DROP TABLE IF EXISTS usuario CASCADE;
EOSQL

echo "Restoring from backup..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" --set=client_encoding=UTF8 -f /docker-entrypoint-initdb.d/backup_monitorabsb_20250118.sql

echo "Verifying restoration..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" --set=client_encoding=UTF8 -c "SELECT COUNT(*) FROM obras;"

echo "Restore complete!"