#!/bin/sh
export POSTGRES_USER=$(cat /run/secrets/db_user);
export POSTGRES_PASSWORD=$(cat /run/secrets/db_password);
export POSTGRES_DB=$(cat /run/secrets/db_name);

/usr/local/bin/docker-entrypoint.sh postgres;
