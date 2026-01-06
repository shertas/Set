FROM php:8.1-apache

# Dependencias
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    default-mysql-client \
    zip unzip git \
  && docker-php-ext-install pdo_mysql \
  && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . /var/www/html

RUN composer install --no-dev --no-interaction || true

# Apache
RUN a2enmod rewrite

# DocumentRoot → public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Alias para src (PHP + JS)
RUN printf '\
Alias /src "/var/www/html/src"\n\
Alias /global "/var/www/html/src/global"\n\
Alias /modules "/var/www/html/src/modules"\n\
\n\
<Directory "/var/www/html/src">\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>\n\
' >> /etc/apache2/apache2.conf

EXPOSE 80
CMD ["apache2-foreground"]
