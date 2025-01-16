chmod +x backend/init-scripts/restore-backup.sh

docker-compose down -v
docker-compose up --build