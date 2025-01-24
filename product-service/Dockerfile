FROM python:3.9-slim-bullseye

WORKDIR /app

COPY requirements.txt .

# Install build dependencies
RUN apt-get update && \
    apt-get install -y gcc libpq-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 3002

CMD ["python", "app.py"] 