clear;

echo "";
echo "Building server";
echo "";

docker build -f ./Dockerfile.server -t calendar-server . --no-cache

echo "";