#!/bin/sh
export REDIS_PASSWORD=$(cat /run/secrets/redis_password);

/usr/local/bin/docker-entrypoint.sh --requirepass $REDIS_PASSWORD;
