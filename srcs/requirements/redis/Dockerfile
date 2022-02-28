FROM alpine:3.15.0

# install prerequisites
RUN apk update && \
  apk add --no-cache \
  redis \
  gettext

COPY conf/redis.conf.template /conf/redis.conf.template

COPY tools/entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 6379
STOPSIGNAL SIGQUIT

CMD ["redis-server", "/conf/redis.conf"]
