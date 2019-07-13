# Contact Manager in Express MVC with Docker

## Using npm to start the application

To change the **docker-web.yml** as the required environment changes

* on development: **`npm run devstart`**

   Access the app: **<a href="http://localhost:9000" target="_blank">localhost:9000</a>**

* on production: **`npm run prodstart`**

   Access the app: **<a href="http://localhost:8000" target="_blank">localhost:8000</a>**

* on default: **`npm start`**

   Access the app: **<a href="http://localhost:7000" target="_blank">localhost:7000</a>**

## Using Docker to start the application

* Build and load app to docker: **`docker-compose build && docker-compose up`**

* Unload the app from docker and turn off the app: **`docker-compose down && docker system prune -f`**

Access the app: **<a href="http://localhost:8080" target="_blank">localhost:8080</a>**
