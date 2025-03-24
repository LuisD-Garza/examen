FROM thecodingmachine/php:7.4-v4-apache
RUN apt-get update && apt-get install -y curl gnupg2 \
    && curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs gcc g++ make \
    && curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor -o /usr/share/keyrings/yarnkey.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y yarn
WORKDIR /var/www/html
COPY . .
RUN chown -R www-data:www-data /var/www/html
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build
RUN chmod -R 777 storage bootstrap/cache
EXPOSE 80
CMD ["apachectl", "-D", "FOREGROUND"]