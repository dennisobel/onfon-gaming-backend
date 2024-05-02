SERVICE := bids

docker_login:
	sudo docker login registry.gitlab.com

docker_build:
	sudo docker build -t registry.gitlab.com/mariainviolater/epicgames_server:v1 .
docker_push:
	sudo docker push registry.gitlab.com/mariainviolater/epicgames_server:v1

build_service: docker_login docker_build docker_push