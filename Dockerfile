FROM thecodingmachine/php:7.4-v4-apache

# Cambia al usuario root para instalar paquetes
USER root

# Instala Node.js y npm
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Copia los archivos del proyecto
COPY . .

# Cambia los permisos para el directorio de trabajo
RUN chown -R www-data:www-data /var/www/html

# Instala las dependencias de PHP como root
RUN composer install --no-dev --optimize-autoloader

# Instala dependencias de Node.js para React como root
RUN npm install && npm run build

# Configura los permisos para Laravel
RUN chmod -R 777 storage bootstrap/cache

# Vuelve al usuario original
USER www-data

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar el servidor
CMD ["apachectl", "-D", "FOREGROUND"]