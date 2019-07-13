Production style deployment

Using Docker to containerize a Node.JS application, a Ngnix web front-end server, and a MongoDB database 

Build and load app to docker: docker-compose build && docker-compose up
Unload the app from docker and turn off the app: docker-compose down && docker system prune -f

Access the app: localhost:8080