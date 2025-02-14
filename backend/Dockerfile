FROM python:3.10

WORKDIR /app

# Instala dependências necessárias, incluindo netcat-openbsd
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    postgresql-client \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

VOLUME /app/migrations

RUN mkdir -p /app/migrations && \
    chown -R root:root /app/migrations && \
    chmod -R 777 /app/migrations

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY regioesAdm.json /app/regioesAdm.json

ENV FLASK_APP=run.py
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

EXPOSE 5000

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]