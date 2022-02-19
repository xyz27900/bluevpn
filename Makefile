start:
	docker-compose up -d

stop:
	docker-compose down

status:
	docker-compose ps

logs:
	docker-compose logs -f

pull:
	docker pull ghcr.io/xyz27900/bluevpn-api:latest
	docker pull ghcr.io/xyz27900/bluevpn-cron:latest
	docker pull ghcr.io/xyz27900/bluevpn-openvpn:latest
	docker pull ghcr.io/xyz27900/bluevpn-ui:latest

setup:
	mkdir -p data/configs
	mkdir -p data/openvpn
	mkdir -p data/postgres
	mkdir -p secrets
