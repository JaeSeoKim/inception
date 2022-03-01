#!/bin/sh

until mysql --host=mariadb --user=$MYSQL_USER --password=$MYSQL_PASSWORD -e '\c'; do
  echo >&2 "mariadb is unavailable - sleeping"
  sleep 1
done

echo >&2 "mariadb is up - start next wordpress bootstrap"

until redis-cli -h redis -a $REDIS_PASSWORD -e 'quit'; do
  echo >&2 "redis is unavailable - sleeping"
  sleep 1
done

echo >&2 "redis is up - start next wordpress bootstrap"

if ! wp core is-installed; then
  echo >&2 "wordpress is unavailable - start wordpress install"
  wp core download --locale=ko_KR --version=5.9.1
  wp config create \
    --dbname=$MYSQL_DB_NAME --dbuser=$MYSQL_USER --dbpass=$MYSQL_PASSWORD --dbhost=mariadb \
    --locale=ko_KR
  wp config set WP_REDIS_HOST redis
  wp config set WP_REDIS_PORT 6379 --raw
  wp config set WP_CACHE_KEY_SALT $DOMAIN_NAME
  wp config set WP_REDIS_PASSWORD $REDIS_PASSWORD
  wp config set WP_REDIS_CLIENT phpredis
  wp core install \
    --url="$DOMAIN_NAME" --title="$WP_TITLE" \
    --admin_user="$WP_ADMIN_USER" --admin_email="$WP_ADMIN_EMAIL" --admin_password="$WP_ADMIN_PASSWORD"
  wp plugin install redis-cache --activate
  wp user create --porcelain \
    "$WP_AUTHOR_USER" "$WP_AUTHOR_EMAIL" --role=author --user_pass="$WP_AUTHOR_PASSWORD"
  wp redis update-dropin
  wp redis enable
  chown -R 82:82 /var/www/html
fi

echo >&2 "wordpress is available - start $@"

exec "$@"
