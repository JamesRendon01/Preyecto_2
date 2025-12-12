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

# Copiar todo el proyecto
WORKDIR /app
COPY . /app

# Instalar dependencias desde backend-pruebas
WORKDIR /app
RUN pip install --no-cache-dir --upgrade pip wheel setuptools && \
    pip install --no-cache-dir -r requirements.txt

# Railway asigna puerto automáticamente
ENV PORT=8000
EXPOSE 8000

# Iniciar la app (ajusta main:app si el archivo se llama distinto)
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]
