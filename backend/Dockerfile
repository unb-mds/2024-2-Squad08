FROM python:3.10

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p /app/migrations && chmod -R 777 /app/migrations

COPY . .
ENV FLASK_APP=run.py
ENV FLASK_ENV=development

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]