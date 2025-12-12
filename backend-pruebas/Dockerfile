FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        gcc \
        pkg-config \
        default-libmysqlclient-dev \
        libmariadb-dev \
        libmariadb-dev-compat \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        zlib1g-dev \
        libssl-dev \
        libffi-dev \
        && rm -rf /var/lib/apt/lists/*

# Copiar solo el backend
WORKDIR /app
COPY backend-pruebas/ .

# Instalar dependencias
RUN pip install --no-cache-dir --upgrade pip wheel setuptools && \
    pip install --no-cache-dir -r requirements.txt

ENV PORT=8000
EXPOSE 8000

# Ejecutar la app
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]
