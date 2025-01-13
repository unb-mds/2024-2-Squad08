#!/bin/sh

echo "Waiting for postgres..."
while ! nc -z postgres 5432; do
    sleep 0.1
done
echo "PostgreSQL started"

python -m flask db init || true
python -m flask db migrate || true
python -m flask db upgrade

python -m flask run --host=0.0.0.0 --port=5000 