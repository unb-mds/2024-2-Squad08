#!/bin/bash

set -e

echo "Waiting for postgres..."
while ! pg_isready -h postgres_db -p 5432 -U postgres; do
    sleep 1
done

echo "Starting Flask application..."
flask run --host=0.0.0.0 --port=5000