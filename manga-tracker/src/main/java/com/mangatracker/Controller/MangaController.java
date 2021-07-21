package com.mangatracker.Controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.mangatracker.Model.Manga;
import com.mangatracker.Model.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("manga")
public class MangaController {
  

  @Autowired
  RestTemplate restTemplate;

  @GetMapping("/search/{title}")
  public Manga[] search(@PathVariable("title") String title) {
    return restTemplate.getForEntity("http://manga-info-service/mangaInfo/search/" + title, Manga[].class).getBody();
  }

  @PostMapping("/add")
  public Response add(@RequestParam("mangaId") String mangaId,
      @RequestParam("userId") String userId, @RequestParam("status") String status) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
    map.add("mangaId", mangaId);
    map.add("userId", userId);
    map.add("status", status);

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);

    return restTemplate.postForObject("http://user-service/manga/add", request , Response.class);
  }

  @GetMapping("user/{userId}")
  public Manga[] getMangas(@PathVariable("userId") String userId) {
    return restTemplate.getForEntity("http://user-service/user/" + userId + "/getMangas", Manga[].class).getBody();
  }


  @GetMapping("{mangaId}")
  public Manga getMangaInfo(@PathVariable String mangaId) {
    return restTemplate.getForObject("http://manga-info-service/mangaInfo/" + mangaId, Manga.class);
  }

  @DeleteMapping
  public Response deleteManga(@RequestParam("userId") String userId,
      @RequestParam("mangaId") String mangaId) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
    map.add("mangaId", mangaId);
    map.add("userId", userId);

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
    return restTemplate.exchange("http://user-service/manga/delete", HttpMethod.DELETE, request, Response.class).getBody();
  }

  @PutMapping("status")
  public Response updateStatus(@RequestParam("userId") String userId,
      @RequestParam("mangaId") String mangaId, @RequestParam("status") String status) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
    map.add("mangaId", mangaId);
    map.add("userId", userId);
    map.add("status", status);

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
    return restTemplate.exchange("http://user-service/manga/status", HttpMethod.PUT, request, Response.class).getBody();
  }

  @PutMapping("lastChapter")
  public Response updateLastChapter(@RequestParam("userId") String userId,
      @RequestParam("mangaId") String mangaId, @RequestParam("lastChapter") String lastChapter) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
    map.add("mangaId", mangaId);
    map.add("userId", userId);
    map.add("lastChapter", lastChapter);

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
    return restTemplate.exchange("http://user-service/manga/lastChapter", HttpMethod.PUT, request, Response.class).getBody();
  }

}
