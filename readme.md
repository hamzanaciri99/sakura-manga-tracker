
# Sakura Manga tracker
![Logo](https://i.ibb.co/J34kbDg/logo.pngo.png =287x41)

## About
Sakura is an application for tracking your favourite Manga series last released chapters and chapters you read, and automatically updating your dashboard with the latest info

## Details
The project is a typical client server application implemented using the following technologies:
 - [Front-end](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/mangatracker):
	 - [Angluar 12](https://github.com/angular/angular): JavaScript framework for developing SPA
	 - [TailwindCSS](https://github.com/tailwindlabs/tailwindcss): CSS framework
 - Back-end:
	 - [Spring boot](https://github.com/spring-projects/spring-framework): Framework for Java-based enterprise applications.

The back-end part was split into multiple microservices using Eureka service registration and discovery offered by the Spring Cloud module:
 - [Discovery server](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/discovery-server)
 - [User service](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/user-service): Responsible for managing users information, including tracked manga series
 - [Manga Info service](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/manga-info-service): Responsible for fetching the latest Manga details from a third party API
 - [Manga tracker](https://github.com/hamzanaciri99/sakura-manga-tracker/tree/master/manga-tracker): Exposes the back-end API endpoints and manages security for private endpoints.
 

## Screenshots
Home Page:
![enter image description here](https://i.ibb.co/4RNpCvV/Screenshot-from-2021-07-24-15-27-19.png)

Dashboard:
![enter image description here](https://i.ibb.co/jJ99RTR/Screenshot-from-2021-07-24-15-28-01.png)

Profile settings:
![enter image description here](https://i.ibb.co/1vSkgHP/Screenshot-from-2021-07-24-15-29-10.png)
