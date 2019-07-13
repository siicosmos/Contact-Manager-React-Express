# Contact Manager in Express MVC with Docker

## Using npm to start the application

To change the **docker-web.yml** as the required environment changes

* on development: **`npm run devstart`**

⋅⋅⋅Access the app: **[http:\\localhost:9000](http:\\localhost:9000)**

* on production: **`npm run prodstart`**

⋅⋅⋅Access the app: **[http:\\localhost:8000](http:\\localhost:8000)**

* on default: **`npm start`**

⋅⋅⋅Access the app: **[http:\\localhost:7000](http:\\localhost:7000)**

## Using Docker to start the application

Build and load app to docker: **`docker-compose build && docker-compose up`**

Unload the app from docker and turn off the app: **`docker-compose down && docker system prune -f`**

Access the app: **[http:\\localhost:8080](http:\\localhost:8080)**
