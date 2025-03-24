# Usa una imagen base de PHP con soporte para Composer
FROM php:7.4-fpm

# Instalar dependencias necesarias para Laravel y React
RUN apt-get update && apt-get install -y \
    git \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip \
    unzip \
    libicu-dev \
    libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql intl xml

# Instalar Composer (gestor de dependencias PHP)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar Node.js y NPM
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs

# Establecer directorio de trabajo en el contenedor
WORKDIR /var/www

# Copiar el archivo de Composer (composer.json) y el de dependencias de React (package.json)
COPY composer.json composer.lock ./
COPY package.json package-lock.json ./

# Instalar dependencias de PHP (Laravel)
RUN composer clear-cache
RUN composer install --no-interaction --prefer-dist -vvv

# Instalar dependencias de Node (React)
RUN npm install

# Copiar el código de tu aplicación
COPY . .

# Copiar el archivo .env
COPY .env.example .env

# Generar las claves de la aplicación de Laravel
RUN php artisan key:generate

# Configurar permisos adecuados para almacenamiento y caché
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Exponer puertos para el servidor web (PHP) y el servidor de desarrollo de React (si fuera necesario)
EXPOSE 9000
EXPOSE 3000

# Arrancar PHP-FPM para Laravel
CMD ["php-fpm"]
