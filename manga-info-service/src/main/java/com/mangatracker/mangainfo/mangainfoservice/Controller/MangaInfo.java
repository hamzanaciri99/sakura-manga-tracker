package com.mangatracker.mangainfo.mangainfoservice.Controller;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mangatracker.mangainfo.mangainfoservice.Model.Manga;
import com.mangatracker.mangainfo.mangainfoservice.Model.MangaResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/mangaInfo")
public class MangaInfo {

  private static final Logger log = LoggerFactory.getLogger(MangaInfo.class);

  @Autowired
  RestTemplate restTemplate;

  private String getLastChapter(String mangaId) throws JsonMappingException, JsonProcessingException {
    String json = 
      restTemplate.getForObject("https://api.mangadex.org/manga/" + mangaId + "/aggregate", String.class);

    //last chapter are considered to be numbers only
    Double lastChapter = 0.0;
    ObjectMapper mapper = new ObjectMapper();
    JsonNode jsonNode = mapper.readTree(json);

    for(JsonNode volume: jsonNode.get("volumes")) {
      for(JsonNode chapter: volume.get("chapters")) {
        try {
          lastChapter = 
            Math.max(lastChapter, Double.parseDouble(chapter.get("chapter").textValue()));
        } catch(NumberFormatException e) { }
      }
    }
    return lastChapter.toString();
  }
  
  @GetMapping("/{mangaId}")
  public Manga getMangaInfo(@PathVariable String mangaId) {
    String lastChapter = "-1";    
    try {
      lastChapter = getLastChapter(mangaId);
    } catch(JsonProcessingException e) { }

    Manga manga =  restTemplate.getForObject(
      "https://api.mangadex.org/manga/" + mangaId, Manga.class);
      manga.setLastChapter(lastChapter);
    return manga;
  }

  @GetMapping("/search/{title}")
  public List<Manga> searchManga(@PathVariable("title") String title)
    throws JsonMappingException, JsonProcessingException {
    return restTemplate.getForObject(
      "https://api.mangadex.org/manga?limit=100&title=" + title, MangaResponse.class).getResults();
  }
}
