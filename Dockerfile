FROM thecodingmachine/php:7.4-v4-apache

# Cambia al usuario root para instalar paquetes
USER root

# Instala Node.js y npm
RUN apt-get update && apt-get install -y nodejs npm

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Copia los archivos del proyecto
COPY . .

# Cambia los permisos para el directorio de trabajo
RUN chown -R www-data:www-data /var/www/html

# Vuelve al usuario original
USER www-data

# Instala las dependencias de PHP
RUN composer install --no-dev --optimize-autoloader

# Instala dependencias de Node.js para React
RUN npm install && npm run build

# Configura los permisos para Laravel
RUN chmod -R 777 storage bootstrap/cache

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar el servidor
CMD ["apachectl", "-D", "FOREGROUND"]