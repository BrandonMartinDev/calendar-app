#!/bin/bash

if [ -z $1 ]; then
    echo ""
    echo "Please provide a tag! Example Usage: 'build-dockerfiles-dev.sh <string>'"
    echo ""
    exit;
fi

clear;
echo "Building server | 'calendar-server:$1'";
echo "";


echo "Starting In..";

for i in {1..3}; do
    echo "$(expr 3 - $i + 1)..."
    sleep 1s
done;

docker build -f ./Dockerfile.server -t calendar-server:$1 ../

echo "";



echo""
echo "Building client | 'calendar-client:$1'";
echo""

sleep 2s;

docker build -f ./Dockerfile.client \
--build-arg VITE_IS_PROD=true \
--build-arg VITE_PROD_BACKEND_URL=http://localhost:8080 \
--build-arg PROD_FRONTEND_URL=http://localhost:80 \
-t calendar-client:$1 ../

echo ""
