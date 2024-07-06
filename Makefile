DBDFORGE_API_PORT=4000
DBDFORGE_API_IMGNAME=ghcr.io/tacxtv/ovh_dbdforge_api
DBDFORGE_API_CONTAINERNAME=ovh_dbdforge_api
DBDFORGE_DEV_NETWORK=dev
DBDFORGE_DEV_MONGODB_PORT=27017
DBDFORGE_DEV_REDIS_PORT=6379
DBDFORGE_DEV_MINIO_BASEPORT=9000
DBDFORGE_DEV_MINIO_CONSOLEPORT=9090
DBDFORGE_DEV_MINIO_ACCESSKEY=ovh_dbdforge
DBDFORGE_DEV_MINIO_SECRETKEY=ovh_dbdforge
PLATFORM=linux/amd64
include .env

# %:
# 	@:
# Args : $(filter-out $@,$(MAKECMDGOALS))
# Usage : make testing -- --primary -a -b=1

.DEFAULT_GOAL := help
help:
	@printf "\033[33mUsage:\033[0m\n  make [target] [arg=\"val\"...]\n\n\033[33mTargets:\033[0m\n"
	@grep -E '^[-a-zA-Z0-9_\.\/]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[32m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Build the docker image
	@docker build \
		--platform $(PLATFORM) \
		-t $(DBDFORGE_API_IMGNAME) .

run: ## Run the docker image
	@docker run -it --rm \
		--name $(DBDFORGE_API_CONTAINERNAME) \
		-p $(DBDFORGE_API_PORT):4000 \
		--platform $(PLATFORM) \
		--network $(DBDFORGE_DEV_NETWORK) \
		--add-host=host.docker.internal:host-gateway \
		-v $(CURDIR):/usr/src/app \
		$(DBDFORGE_API_IMGNAME) sh

dev: ## Run the docker image in dev mode
	@docker run -it --rm \
		--name $(DBDFORGE_API_CONTAINERNAME) \
		-p $(DBDFORGE_API_PORT):4000 \
		--platform $(PLATFORM) \
		--network $(DBDFORGE_DEV_NETWORK) \
		--add-host=host.docker.internal:host-gateway \
		-v $(CURDIR):/usr/src/app \
		$(DBDFORGE_API_IMGNAME) yarn run start:dev

exec: ## Execute sh process in the running container
	@docker exec -it $(DBDFORGE_API_CONTAINERNAME) sh

dbs: ## Start the databases
	@docker volume create $(DBDFORGE_API_CONTAINERNAME)_mongodb
	@docker run -d --rm \
		--name $(DBDFORGE_API_CONTAINERNAME)_mongodb \
		-v $(DBDFORGE_API_CONTAINERNAME)_mongodb:/data/db \
		-p $(DBDFORGE_DEV_MONGODB_PORT):27017 \
		--network $(DBDFORGE_DEV_NETWORK) \
		--platform $(PLATFORM) \
		-e ALLOW_EMPTY_PASSWORD=yes \
		--health-interval=5s \
		--health-timeout=3s \
		--health-start-period=5s \
		--health-retries=3 \
		--health-cmd="mongosh --eval \"db.stats().ok\" || exit 1" \
		mongo:7.0 --wiredTigerCacheSizeGB 1.5 --bind_ip localhost,$(DBDFORGE_API_CONTAINERNAME)_mongodb

	@docker volume create $(DBDFORGE_API_CONTAINERNAME)_redis
	@docker run -d --rm \
		--name $(DBDFORGE_API_CONTAINERNAME)_redis \
		-v $(DBDFORGE_API_CONTAINERNAME)_redis:/data \
		-p $(DBDFORGE_DEV_REDIS_PORT):6379 \
		--network $(DBDFORGE_DEV_NETWORK) \
		--platform $(PLATFORM) \
		--health-interval=5s \
		--health-timeout=3s \
		--health-start-period=5s \
		--health-retries=3 \
		--health-cmd="redis-cli ping || exit 1" \
		redis:7-alpine

	@docker volume create $(DBDFORGE_API_CONTAINERNAME)_minio
	@docker run -d --rm \
		--name $(DBDFORGE_API_CONTAINERNAME)_minio \
		-p $(DBDFORGE_DEV_MINIO_BASEPORT):9000 \
		-p $(DBDFORGE_DEV_MINIO_CONSOLEPORT):9090 \
		-v $(DBDFORGE_API_CONTAINERNAME)_minio:/data \
		--platform $(PLATFORM) \
		--network $(DBDFORGE_DEV_NETWORK) \
		-e "MINIO_ACCESS_KEY=$(DBDFORGE_DEV_MINIO_ACCESSKEY)" \
		-e "MINIO_SECRET_KEY=$(DBDFORGE_DEV_MINIO_SECRETKEY)" \
		minio/minio server /data --console-address ":9090"

# testing: ## test
# 	@echo "testing: $(filter-out $@,$(MAKECMDGOALS))"
