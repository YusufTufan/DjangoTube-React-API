# frontend/Dockerfile

# Node.js imajını kullan
FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# package.json dosyasını kopyala ve bağımlılıkları yükle
COPY package.json /app/
RUN npm install

# Proje dosyalarını kopyala
COPY . /app/

# Portu aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]