clear;

echo "";
echo "Building server";
echo "";

docker build -f ./Dockerfile.server -t calendar-server ../ --no-cache

echo "";


sleep 2s;

echo""
echo "Building client"
echo""

docker build -f ./Dockerfile.client -t calendar-client ../ --no-cache

echo""