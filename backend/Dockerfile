# backend/Dockerfile

# Python 3.10 imajını kullan
FROM python:3.10-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Gereksiz Python dosyalarını (.pyc) oluşturma ve çıktıları anında göster
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Sistem bağımlılıklarını yükle (PostgreSQL vs. için gerekebilir)
RUN apt-get update && apt-get install -y build-essential libpq-dev

# Bağımlılıkları kopyala ve yükle
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Proje dosyalarını kopyala
COPY . /app/

# Portu aç
EXPOSE 8000

# Sunucuyu başlat
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]