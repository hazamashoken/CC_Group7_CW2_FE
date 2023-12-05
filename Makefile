include ./app/.env.local

all:
	@echo "No defaults"

build:
	docker build -t cancer-frontend-main:latest .

run:
	docker run -it --rm -p 3005:3000 cancer-frontend-main:latest

init-git:
	git config core.filemode false
	git config --global --add safe.directory /workspaces/frontend-main-cancer

api-schema:
	@echo "Generating API schema"
	npx openapi-typescript ${NEXT_PUBLIC_BACKEND_URL}/api/openapi.json -o app/schemas/api-schema.d.ts || \
	npx openapi-typescript ${BACKEND_URL}/api/openapi.json -o app/schemas/api-schema.d.ts