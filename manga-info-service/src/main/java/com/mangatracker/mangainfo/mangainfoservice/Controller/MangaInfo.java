package com.mangatracker.mangainfo.mangainfoservice.Controller;

import com.mangatracker.mangainfo.mangainfoservice.Model.Manga;

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
  
  @GetMapping("/{mangaId}")
  public Manga getMangaInfo(@PathVariable String mangaId) {
    log.info("getMangaInfo:" + mangaId);
    return restTemplate.getForObject(
      "https://api.mangadex.org/manga/" + mangaId, Manga.class);
  }

}
