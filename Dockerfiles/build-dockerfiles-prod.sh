#!/bin/bash

DOCKERHUB_USERNAME="your_username_here"             # Please change this from the default
PROD_BACKEND_URL="https://api.example.com"          # Please change this from the default



###### Don't need to change anything under this line ######

if [ -z $1 ]; then
    echo ""
    echo "Please provide a tag! Example Usage: 'build-dockerfiles-dev.sh <string:tag>'"
    echo ""
    exit;
fi

clear;

echo "";
echo "Building server for PROD | '$DOCKERHUB_USERNAME/calendar-server:$1'";
echo "";

sleep 5s;

docker build -f ./Dockerfile.server -t $DOCKERHUB_USERNAME/calendar-server:$1 ../ --push

echo "";


sleep 2s;

echo""
echo "Building client for PROD | '$DOCKERHUB_USERNAME/calendar-client:$1'"
echo""

docker build -f ./Dockerfile.client \
--build-arg VITE_IS_PROD=true \
--build-arg VITE_PROD_BACKEND_URL=$PROD_BACKEND_URL \
-t $DOCKERHUB_USERNAME/calendar-client:$1 ../ --push

echo ""
