# Contact Manager in Express as Back-End server and Nginx as Front-End server with Docker

A simple contact manager using Express.JS and Nginx with Docker

### Using npm to start the application

To change the **docker-web.yml** as the required environment changes

* on development: **`npm run devstart`**

   Access the app: **<a href="http://localhost:9000" target="_blank">localhost:9000</a>**

* on production: **`npm run prodstart`**

   Access the app: **<a href="http://localhost:8000" target="_blank">localhost:8000</a>**

* on default: **`npm start`**

   Access the app: **<a href="http://localhost:7000" target="_blank">localhost:7000</a>**

### Using Docker to start the application

* Build and load app to docker: **`docker-compose build && docker-compose up`**

* Unload the app from docker and turn off the app: **`docker-compose down && docker system prune -f`**

Access the app: **<a href="http://localhost:8080" target="_blank">localhost:8080</a>**

### Just an important reminder

By using Docker to deploy this application, there will be three Dokcer containers generated.

* A Node.JS server container using Express.JS

* A Nginx Front-End server container

* A MongoDB container

The application is using MongoDB as an local image which will be containerized by Docker by default.

But if you wish to run this application on default/development mode using **`npm start`**/**`npm run devstart`**, the database is not a local database, but the applciation will use MongoDB Atlas which is a on-cloud database.

