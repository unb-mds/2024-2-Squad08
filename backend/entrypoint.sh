#!/bin/bash

set -e

echo "Waiting for postgres..."
./wait-for-postgres.sh postgres

echo "Cleaning up existing migrations..."
rm -rf migrations/
flask db init

echo "Running migrations..."
if flask db current > /dev/null 2>&1; then
    echo "Dropping existing database..."
    flask db downgrade base
fi

flask db migrate -m "initial migration"
flask db upgrade

echo "Verifying database state..."
if ! flask db current > /dev/null 2>&1; then
    echo "Migration failed!"
    exit 1
fi

echo "Starting Flask..."
exec flask run --host=0.0.0.0 --port=5000