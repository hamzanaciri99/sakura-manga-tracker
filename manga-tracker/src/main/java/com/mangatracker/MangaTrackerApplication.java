package com.mangatracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MangaTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MangaTrackerApplication.class, args);
	}

}
