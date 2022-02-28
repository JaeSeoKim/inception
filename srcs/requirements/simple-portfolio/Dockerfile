FROM alpine:3.15.0

# install prerequisites
RUN apk update && \
  apk add --no-cache \
  nodejs npm git && \
  npm install -g serve

COPY src /app

WORKDIR /app

RUN npm install && npm run build

COPY tools/entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3000
STOPSIGNAL SIGQUIT


CMD ["serve", "dist"]
