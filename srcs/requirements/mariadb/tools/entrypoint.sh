#!/bin/sh

if [ ! -d /var/lib/mysql/$MYSQL_DB_NAME ]; then
  mysql_install_db
  /usr/share/mariadb/mysql.server start
  mysql -e "\
    CREATE DATABASE IF NOT EXISTS ${MYSQL_DB_NAME} DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci; \
    CREATE USER '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}'; \
    GRANT ALL ON ${MYSQL_DB_NAME}.* TO '${MYSQL_USER}'@'%'; \
    ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}'; \
    FLUSH PRIVILEGES; \
    "
  mysqladmin --user=root --password=$MYSQL_ROOT_PASSWORD shutdown
fi

exec "$@"
