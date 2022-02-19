#!/bin/bash
export REDIS_PASSWORD=$(cat /run/secrets/redis_password);

if [ ! -d "/etc/openvpn/pki" ];
then
  ovpn_genconfig -u udp://195.2.93.253;
  echo "bluevpn" | ovpn_initpki nopass;
fi

declare -a arr=("ovpn_run" "node /app/main.js")

for cmd in "${arr[@]}"; do {
  echo "Process \"$cmd\" started";
  $cmd & pid=$!
  PID_LIST+=" $pid";
} done

trap "kill $PID_LIST" SIGINT

echo "Parallel processes have started";

wait $PID_LIST

echo
echo "All processes have completed";
