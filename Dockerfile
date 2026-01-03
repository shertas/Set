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

#Permisos para apache
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride None\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/public.conf \
  && a2enconf public

#Permisos para Render
RUN chown -R www-data:www-data /var/www/html \
  && chmod -R 755 /var/www/html

# Copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["apache2-foreground"]
