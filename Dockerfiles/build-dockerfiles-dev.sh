#!/bin/bash

TEST_BACKEND_URL="http://localhost:8080"        # Please change this from the default



###### Don't need to change anything under this line ######

if [ -z $1 ]; then
    echo ""
    echo "Please provide a tag! Example Usage: 'build-dockerfiles-dev.sh <string:tag>'"
    echo ""
    exit;
fi

clear;
echo "Building server for DEV | 'calendar-server:$1'";
echo "";


echo "Starting In..";

for i in {1..3}; do
    echo "$(expr 3 - $i + 1)..."
    sleep 1s
done;

docker build -f ./Dockerfile.server -t calendar-server:$1 ../

echo "";



echo""
echo "Building client for DEV | 'calendar-client:$1'";
echo""

sleep 2s;

docker build -f ./Dockerfile.client \
--build-arg VITE_IS_PROD=false \
--build-arg VITE_TEST_BACKEND_URL=$TEST_BACKEND_URL \
-t calendar-client:$1 ../

echo ""
