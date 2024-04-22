# Usamos una imagen base de Node.js
FROM node:20-alpine AS build
# Instala el CLI de Angular globalmente
RUN npm install -g @angular/cli

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos restantes del proyecto
COPY . .

# Expone el puerto 4200, que es el puerto predeterminado de ng serve
EXPOSE 4200

# Inicia la aplicación Angular con ng serve
CMD ng serve --host 0.0.0.0