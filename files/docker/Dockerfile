FROM ubuntu:latest

# Initialize arguments
ARG DB_NAME
ARG DB_USER
ARG DB_PASS

ARG WP_ADMIN_EMAIL
ARG WP_ADMIN_PASSWORD

ARG WP_SITE_TITLE

ARG WP_THEME_NAME
ARG WP_THEME_SLUG
ARG WP_THEME_AUTHOR

ARG WP_PLUGINS

# Initialize environment variables
ENV DB_NAME "$DB_NAME"
ENV DB_USER "$DB_USER"
ENV DB_PASS "$DB_PASS"

ENV WP_ADMIN_EMAIL "$WP_ADMIN_EMAIL"
ENV WP_ADMIN_PASSWORD "$WP_ADMIN_PASSWORD"

ENV WP_SITE_TITLE "$WP_SITE_TITLE"

ENV WP_THEME_NAME "$WP_THEME_NAME"
ENV WP_THEME_SLUG "$WP_THEME_SLUG"
ENV WP_THEME_AUTHOR "$WP_THEME_AUTHOR"

ENV WP_PLUGINS "$WP_PLUGINS"

# Initialize directories
RUN \
	mkdir /mnt/data && \
	mkdir /mnt/styles && \
	mkdir /var/www && \
	mkdir /var/www//html

# Initialize Volumes
VOLUME /mnt/data
VOLUME /mnt/styles
VOLUME /var/www/html

# Install dependencies in non-interactive mode
RUN \
	set -ex; \
	apt-get update && \
	DEBIAN_FRONTEND=noninteractive \
	apt-get install -y \
		curl \
		libjpeg-dev \
		libpng12-dev \
		software-properties-common \
		net-tools \
		nano \
		mariadb-server \
		php-cgi \
		php-cli \
		php-curl \
		php-mcrypt \
		php-mysql \
		php-xdebug

# Clean packages
RUN rm -rf /var/lib/apt/lists/*

# Set recommended PHP.ini settings
# See https://secure.php.net/manual/en/opcache.installation.php
RUN \
	{ \
		echo 'opcache.memory_consumption=128'; \
		echo 'opcache.interned_strings_buffer=8'; \
		echo 'opcache.max_accelerated_files=4000'; \
		echo 'opcache.revalidate_freq=2'; \
		echo 'opcache.fast_shutdown=1'; \
		echo 'opcache.enable_cli=0'; \
	} > /etc/php/7.0/cli/conf.d/opcache-recommended.ini

# Set XDebug PHP.ini settings
RUN \
	{ \
		echo '[XDEBUG]'; \
		echo 'xdebug.remote_enable=1'; \
		echo 'xdebug.remote_autostart=1'; \
		echo 'xdebug.remote_handler=dbgp'; \
		echo 'xdebug.remote_host=0.0.0.0'; \
		echo 'xdebug.remote_port=9000'; \
		echo 'xdebug.remote_mode=req'; \
	} > /etc/php/7.0/cli/conf.d/xdebug.ini

# Set custom PHP.ini settings
RUN \
	{ \
		echo 'max_file_uploads=999'; \
		echo 'upload_max_filesize=999M'; \
		echo 'post_max_size=0'; \
		echo 'max_execution_time=9999'; \
		echo 'max_input_time=-1'; \
	} > /etc/php/7.0/cli/conf.d/custom.ini

# Configure database
RUN \
	sed -i 's/^\(bind-address\s.*\)/# \1/' /etc/mysql/my.cnf && \
	{ \
		echo "mysqld_safe &"; \
		echo "mysqladmin --silent --wait=30 ping || exit 1"; \
		echo "mysql -e 'GRANT ALL PRIVILEGES ON *.* TO \"root\"@\"%\" WITH GRANT OPTION;'"; \
		echo "mysql -e 'CREATE DATABASE $DB_NAME;'"; \
		echo "mysql -e 'GRANT ALL PRIVILEGES ON $DB_NAME.* TO $DB_USER@localhost IDENTIFIED BY \"$DB_PASS\";'"; \
		echo "mysql -e 'FLUSH PRIVILEGES;'"; \
	} > /tmp/config && \
	bash /tmp/config && \
	rm -f /tmp/config

# Copy entrypoint script to container
COPY docker-entrypoint.sh /usr/local/bin/

# Configure entrypoint script permissions
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Execute entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["/bin/bash"]

# Expose ports
EXPOSE 80
EXPOSE 3306
EXPOSE 9000
