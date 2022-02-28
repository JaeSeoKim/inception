#!/bin/sh

envsubst '${REDIS_PASSWORD}' </conf/redis.conf.template >/conf/redis.conf

exec "$@"
