#!/bin/sh
export DB_USER=$(cat /run/secrets/db_user);
export DB_PASSWORD=$(cat /run/secrets/db_password);
export DB_NAME=$(cat /run/secrets/db_name);
export REDIS_PASSWORD=$(cat /run/secrets/redis_password);

/usr/local/bin/docker-entrypoint.sh "$@";
