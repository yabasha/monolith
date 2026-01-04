FROM php:8.4-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip zip libpng-dev libonig-dev libxml2-dev \
    libzip-dev libicu-dev \
    && docker-php-ext-install pdo_mysql mbstring zip intl gd \
    && apt-get clean

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Install Laravel dependencies when building
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader || true

# Copy rest of the app
COPY . .

RUN chown -R www-data:www-data /var/www/html

EXPOSE 9000
CMD ["php-fpm"]
