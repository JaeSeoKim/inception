FROM alpine:3.15.0

# install prerequisites
RUN apk update && \
  apk add --no-cache \
  vsftpd \
  gettext

COPY conf/vsftpd.conf /etc/vsftpd.conf

RUN adduser -D -h /var/www/html -u 82 -s /sbin/nologin www-data -G www-data

COPY tools/entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 20/tcp 21/tcp
STOPSIGNAL SIGQUIT

VOLUME ["/var/www/html"]

CMD ["vsftpd"]
