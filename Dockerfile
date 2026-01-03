FROM php:8.1-apache

# Install system deps and PHP extensions needed for typical PHP apps
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    default-mysql-client \
    zip unzip git \
    libssl-dev \
    libonig-dev \
  && docker-php-ext-install pdo_mysql mbstring \
  && rm -rf /var/lib/apt/lists/*

# Install Composer binary
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working dir and copy sources
WORKDIR /var/www/html
COPY . /var/www/html

# Install PHP deps
RUN composer install --no-dev --no-interaction --optimize-autoloader || true

# Apache sirve todo el proyecto (no solo /public)
RUN a2enmod rewrite

# Configurar /public como la raíz del sitio (DocumentRoot)
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# CRUCIAL: Añadir un Alias para que los archivos estáticos de /src sean accesibles vía URL
RUN echo 'Alias /src "/var/www/html/src"' >> /etc/apache2/apache2.conf

# Copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["apache2-foreground"]
