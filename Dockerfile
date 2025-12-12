# Imagen base ligera con Python 3.11
FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias del sistema necesarias para:
# - MySQL/MariaDB
# - Cairo, Freetype, ReportLab
# - Pillow
# - Cryptography
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        gcc \
        pkg-config \
        # MySQL/MariaDB
        default-libmysqlclient-dev \
        libmariadb-dev \
        libmariadb-dev-compat \
        # Cairo + Freetype
        libcairo2 \
        libcairo2-dev \
        libfreetype6 \
        libfreetype6-dev \
        # Pillow
        libjpeg62-turbo-dev \
        libpng-dev \
        zlib1g-dev \
        # Cryptography
        libssl-dev \
        libffi-dev \
        && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /app

# Copiar todo el proyecto
COPY . /app

# Entrar al backend
WORKDIR /app/BACKEND

# Instalar dependencias Python usando requirements.txt
RUN pip install --no-cache-dir --upgrade pip wheel setuptools && \
    pip install --no-cache-dir -r requirements.txt

# Railway asigna dinámicamente el puerto en $PORT
ENV PORT=8000

# Exponer puerto (Railway lo reemplaza, pero evita warnings)
EXPOSE 8000

CMD ["sh", "-c", "alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port $PORT"]
