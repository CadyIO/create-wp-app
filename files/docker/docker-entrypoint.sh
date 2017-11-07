#!/bin/bash
set -euo pipefail

# Start database
service mysql start

# Install WP-CLI
curl -o wp-cli.phar -fSL "https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar"
chmod +x wp-cli.phar
mv wp-cli.phar /usr/local/bin/wp

# Switch to WordPress directory
cd /var/www/html

# Download WordPress
wp core download --allow-root --force

# Create WP Config
wp config create --allow-root --force --dbhost=localhost --dbname=${DB_NAME} --dbuser=${DB_USER} --dbpass=${DB_PASS} --extra-php <<PHP
define('WP_DEBUG', true);
define('FS_METHOD', 'direct');
PHP

# Create/Restore database
if [ ! -f /mnt/data/backup.sql ]
then
	wp core install --url=http://0.0.0.0 --title="${WP_SITE_TITLE}" --admin_user=${WP_ADMIN_EMAIL} --admin_password=${WP_ADMIN_PASSWORD} --admin_email=${WP_ADMIN_EMAIL} --skip-email --allow-root

	wp rewrite structure '/%postname%/' --allow-root

	wp scaffold _s ${WP_THEME_SLUG} --theme_name="${WP_THEME_NAME}" --author="${WP_THEME_AUTHOR}" --sassify --activate --force --allow-root

	rm -rf /var/www/html/wp-content/themes/${WP_THEME_SLUG}/.editorconfig
	rm -rf /var/www/html/wp-content/themes/${WP_THEME_SLUG}/phpcs.xml.dist

	mv /var/www/html/wp-content/themes/${WP_THEME_SLUG}/sass/* /mnt/styles/
	rm -rf /var/www/html/wp-content/themes/${WP_THEME_SLUG}/sass/

	mysqldump ${DB_NAME} > /mnt/data/backup.sql
else
	wp db import /mnt/data/backup.sql --allow-root
fi

# Plugins
wp plugin delete --allow-root $(wp plugin list --allow-root --status=inactive --field=name)

for plugin in $WP_PLUGINS; do
	wp plugin install $plugin --activate --allow-root
done

# Themes
wp theme delete --allow-root $(wp theme list --allow-root --status=inactive --field=name)

# Set up .htaccess
cat > /var/www/html/.htaccess <<-'EOF'
	# BEGIN WordPress
	<IfModule mod_rewrite.c>
	RewriteEngine On
	RewriteBase /
	RewriteRule ^index\.php$ - [L]
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{THE_REQUEST} ^GET.*index\.php [NC]
	RewriteRule (.*?)index\.php/*(.*) /$1$2 [R=301,NE,L]
	</IfModule>
	# END WordPress
EOF

# Set permissions
find . -type f -exec chmod 664 {} +
find . -type d -exec chmod 775 {} +
chmod 660 wp-config.php
chmod 644 .htaccess

# Start server
wp server --host=0.0.0.0 --port=80 --allow-root
