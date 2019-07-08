To change the docker-web.yml as the required environment changes

#on dev npm run devstart
#on prod npm run prodstart
#on default npm start

Build and load app to docker: docker-compose build && docker-compose up

Unload the app from docker and turn off the app: docker-compose down && docker system prune -f

Access the app: localhost:8080
