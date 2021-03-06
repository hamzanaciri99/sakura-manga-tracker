
  

#  Sakura Manga tracker

![Logo](https://i.ibb.co/J34kbDg/logo.pngo.png)

  

##  About

Sakura is an application for tracking your favourite Manga series last released chapters and chapters you read, and automatically updating your dashboard with the latest info

  

##  Details

The project is a typical client server application implemented using the following technologies:

-  [**Front-end**](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/mangatracker):

	-  [Angluar 12](https://github.com/angular/angular): JavaScript framework for developing SPA

	-  [TailwindCSS](https://github.com/tailwindlabs/tailwindcss): CSS framework

- **Back-end:**

	-  [Spring boot](https://github.com/spring-projects/spring-framework): Framework for Java-based enterprise applications.

  

The back-end part was split into multiple microservices using Eureka service registration and discovery offered by the Spring Cloud module:

-  [Discovery server](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/discovery-server)

-  [User service](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/user-service): Responsible for managing users information, including tracked manga series

-  [Manga Info service](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/manga-info-service): Responsible for fetching the latest Manga details from a third party API

-  [Manga tracker](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/manga-tracker): Exposes the back-end API endpoints and manages security for private endpoints.

##  How to deploy?
###  Deploy Locally using Docker compose
In this approach we will be using Docker compose to deploy the application.

Clone the project:

	$ git clone https://github.com/hamzanaciri99/sakura-manga-tracker.git

Open the project folder and checkout the commit "deploy locally" on the "***deploy***" branch:

	$ git checkout deploy 

First, we have to build our docker images. Open the terminal and:

Go the ***discovery-server*** folder:

	$ cd discovery-server
Then build the project:

    $ mvn clean install -DskipTests
 Now that the jar files are ready, we need to build our docker image (Note that a Dockerfile already exists for each project in this branch):

	$ docker image build . -f Dockerfile -t sakura/discovery-server
Repeat the same steps on each of the folders: ***user-service, manga-info-service, manga-tracker*** and ***db***

> Note that the images name are ***sakura/\<folder-name>*** and ***sakura/mariadb*** for db folder, you can change that but you'll have to change the *image* property in the *docker-compose.yml* file.OU

You can check images using:

	$ docker images 

Build image for  the front-end application (**mangatracker** folder):

	$ docker image build . -f Dockerfile -t sakura/mangatracker-ng
 You should have all the 5 images:
![enter image description here](https://i.ibb.co/Kwh8Jc2/Screenshot-from-2021-07-25-16-05-47.png) 
 
Navigate back to the root folder and run the docker-compose:

	$ docker-compose up
  Wait for the back-end services to run and register themselves on the discovery server, you can check the status and number of services on: http://localhost:8761/

![enter image description here](https://i.ibb.co/9hRJ6pF/Screenshot-from-2021-07-25-15-58-12.png)

Finally, you can access the application via: http://localhost/

You can stop the application with: 

	$ docker-compose down
 
## Metrics

We'll integrate our application (using spring boot actuator) with a monitoring system called [Prometheus](https://prometheus.io/) and a graphing solution called [Grafana](https://grafana.com/).

![prometheus](https://i.ibb.co/dcrhPML/Screenshot-from-2021-08-11-16-15-14.png)

![Grafana dashboard](https://i.ibb.co/3sZ0t6W/Screenshot-from-2021-08-11-16-14-49.png)

***PS: Metrics are yet to be added in the deploy branch, if you want to test it you'll have to deploy project from the master branch and run Prometheus server with prometheus.yml file then add it to the data-source of Grafana.
THERE WILL BE A SECTION ABOUT THE STEPS SOON***

## Alertmanager

[Prometheus Alertmanager](https://github.com/prometheus/alertmanager) handles alerts sent by Prometheus server and notifies end user through various method, We will set it up with Gmail to send notifications through email:

![Alertmanager](https://i.ibb.co/0KVXb3f/Screenshot-from-2021-08-15-13-05-16.png)

##  Screenshots

**Home Page:**

![Home Page](https://i.ibb.co/4RNpCvV/Screenshot-from-2021-07-24-15-27-19.png)

  

**Dashboard:**

![Dashboard](https://i.ibb.co/jJ99RTR/Screenshot-from-2021-07-24-15-28-01.png)

  

**Profile settings:**

![Profile settings](https://i.ibb.co/1vSkgHP/Screenshot-from-2021-07-24-15-29-10.png)
