# Usa una imagen de node de alpine con la versión específica que necesites
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json al directorio de trabajo
COPY package.json .

# Instala dependencias, incluido bcrypt si es necesario
RUN apk add --no-cache make gcc g++ python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3

# Copia el resto de los archivos de la aplicación
COPY . .

# Ejecuta el comando para construir la aplicación Angular
RUN npm run build

# Expone el puerto 8080 para acceder a la aplicación
EXPOSE 4200

# Define el comando para iniciar la aplicación
CMD ["npm", "run", "start"]
