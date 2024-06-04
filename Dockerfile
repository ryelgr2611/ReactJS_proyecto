# Etapa 1: Construcción
FROM node:21.6.1 AS build

# Establecer el directorio de trabajo en la raíz del proyecto
WORKDIR /app

# Copiar los archivos package.json y package-lock.json de la raíz
COPY package.json package-lock.json ./

# Instalar dependencias de la raíz
RUN npm install

# Copiar los archivos de la aplicación a la raíz del directorio de trabajo
COPY lookBooster/package.json lookBooster/package-lock.json lookBooster/

# Cambiar el directorio de trabajo a lookBooster
WORKDIR /app/lookBooster

# Instalar dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY lookBooster/ ./

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copiar los archivos estáticos construidos desde la etapa de construcción
COPY --from=build /app/lookBooster/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf


# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
