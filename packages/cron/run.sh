#!/bin/sh
node /app/main.js > /proc/1/fd/1 2>/proc/1/fd/2
