FROM alpine:3.15.0

LABEL maintainer="jaeskim <jaeskim@student.42seoul.kr>"

# install prerequisites
RUN apk update && \
  apk add --no-cache \
  openssl curl ca-certificates gettext

RUN \
  # set up the apk repository for stable nginx packages,
  printf "%s%s%s%s\n" \
  "@nginx " \
  "http://nginx.org/packages/alpine/v" \
  `egrep -o '^[0-9]+\.[0-9]+' /etc/alpine-release` \
  "/main" \
  | tee -a /etc/apk/repositories; \
  # import an official nginx signing key so apk could verify the packages authenticity
  KEY_SHA512="e7fa8303923d9b95db37a77ad46c68fd4755ff935d0a534d26eba83de193c76166c68bfe7f65471bf8881004ef4aa6df3e34689c305662750c0172fca5d8552a *stdin" \
  && curl -o /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub  \
  && if [ "$(openssl rsa -pubin -in /tmp/nginx_signing.rsa.pub -text -noout | openssl sha512 -r)" = "$KEY_SHA512" ]; then \
  echo "key verification succeeded!"; \
  mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/; \
  else \
  echo "key verification failed!"; \
  exit 1; \
  fi \
  && apk add nginx@nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY /conf/www.conf.template /etc/nginx/conf.d/www.conf.template

COPY tools/entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 443/tcp

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
