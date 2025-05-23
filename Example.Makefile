# Version 20240804 Added other deploy paths

deployDockerBackend:
	echo "$(tput setaf 2)Deploying Backend...$(tput sgr0)"
	cd /opt/appgroup/backend_appname && \
	echo "$(tput setaf 2)Stashing any uncommitted changes...$(tput sgr0)"
	git stash && git checkout -m main && \
	echo "$(tput setaf 2)Fetching the latest changes...$(tput sgr0)"
	git fetch && \
	echo "$(tput setaf 2)Merging the latest changes...$(tput sgr0)"
	git merge origin/main -m "Automerged by Makefile" && \
	echo "$(tput setaf 2)Rebuilding the JAR file and docker...$(tput sgr0)"
	./gradlew bootJar && \
	echo "$(tput setaf 2)Stopping the old docker container...$(tput sgr0)"
	docker stop appname_backend && \
	echo "$(tput setaf 2)Removing the old docker container...$(tput sgr0)"
	docker rm appname_backend && \
	echo "$(tput setaf 2)Building the new docker image...$(tput sgr0)"
	docker build -t api:latest . && \
	echo "$(tput setaf 2)Starting the new docker container...$(tput sgr0)"
	docker compose up -d --build appname_backend && \
	echo "$(tput setaf 2)Waiting for the new docker container to start...$(tput sgr0)"
	sleep 10 && \
	echo "$(tput setaf 3) Backend Deployment Completed.$(tput sgr0)" && cd -

deployPm2Backend:
	echo "$(tput setaf 2)Deploying Backend...$(tput sgr0)"
	cd /opt/appgroup/backend_appname && \
	echo "$(tput setaf 2)Stashing any uncommitted changes...$(tput sgr0)"
	git stash && git checkout -m main && \
	echo "$(tput setaf 2)Fetching the latest changes...$(tput sgr0)"
	git fetch && \
	echo "$(tput setaf 2)Merging the latest changes...$(tput sgr0)"
	git merge origin/main -m "Automerged by Makefile" && \
	echo "$(tput setaf 2)Rebuilding the JAR file...$(tput sgr0)"
	./gradlew bootJar && \
	echo "$(tput setaf 2)Stopping the old pm2 process...$(tput sgr0)"
	pm2 stop appname_backend && \
	echo "$(tput setaf 2)Starting the new pm2 process...$(tput sgr0)"
	pm2 start build/libs/appname-api-*.jar --name appname-api --interpreter java --no-autorestart --restart-delay=10000 && \
	echo "$(tput setaf 3)AserT Backend Deployment Completed.$(tput sgr0)" && cd -

deployFrontend:
	echo "$(tput setaf 2)Deploying Frontend...$(tput sgr0)"
	cd /opt/appgroup/frontend_appname && \
	echo "$(tput setaf 2)Stashing any uncommitted changes...$(tput sgr0)"
	git stash && git checkout -m main && \
	echo "$(tput setaf 2)Fetching the latest changes...$(tput sgr0)"
	git fetch && \
	echo "$(tput setaf 2)Merging the latest changes...$(tput sgr0)"
	git merge origin/main -m "Automerged by Makefile" && \
	echo "$(tput setaf 2)Installing dependencies...$(tput sgr0)"
	yarn install --silent && \
	echo "$(tput setaf 2)Building the frontend...$(tput sgr0)"
	yarn build --silent && \
	echo "$(tput setaf 2)Waiting for the frontend app to start$(tput sgr0)"
	sleep 5 && \
	echo "$(tput setaf 3)Frontend Deployment Completed.$(tput sgr0)" && cd -

deployWebhooks:
	echo "$(tput setaf 2)Deploying Webhooks...$(tput sgr0)"
	cd /opt/appgroup/webhooks_appname && \
	echo "$(tput setaf 2)Stashing any uncommitted changes...$(tput sgr0)"
	git stash && git checkout -m main && \
	echo "$(tput setaf 2)Fetching the latest changes...$(tput sgr0)"
	git fetch && \
	echo "$(tput setaf 2)Merging the latest changes...$(tput sgr0)"
	git merge origin/main -m "Automerged by Makefile" && \
	echo "$(tput setaf 2)Installing dependencies...$(tput sgr0)"
	npm install --silent && \
	echo "$(tput setaf 2)Building the webhooks...$(tput sgr0)"
	pm2 restart appname-webhooks && \
	echo "$(tput setaf 2)Waiting for the webhooks app to start$(tput sgr0)"
	sleep 5 && \
	echo "$(tput setaf 3)Webhooks Deployment Completed.$(tput sgr0)" && cd -
