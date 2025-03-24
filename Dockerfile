FROM thecodingmachine/php:7.4-v4-apache
USER root
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs

WORKDIR /var/www/html

COPY . .

RUN chown -R www-data:www-data /var/www/html

RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build
USER www-data

RUN chmod -R 777 storage bootstrap/cache
EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]