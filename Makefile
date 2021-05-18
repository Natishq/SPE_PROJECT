build:
	cd backendfinal && $(MAKE) build
	cd frontendfinal && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down