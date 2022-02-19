#!/bin/sh
export CF_Key=$(cat /run/secrets/cf_key);
export CF_Email=$(cat /run/secrets/cf_email);

/root/.acme.sh/acme.sh --register-account -m admin@bluevpn.tech;
/root/.acme.sh/acme.sh --issue -d bluevpn.tech --dns dns_cf;

/docker-entrypoint.sh "$@";
