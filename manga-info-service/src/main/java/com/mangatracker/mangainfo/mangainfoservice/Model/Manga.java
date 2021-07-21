package com.mangatracker.mangainfo.mangainfoservice.Model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Manga {
  
  private String title;
  private String mangaId;
  private String status;
  private String lastChapter;

  public Manga(String title, String mangaId, String lastChapter) {
    this.title = title;
    this.mangaId = mangaId;
    this.lastChapter = lastChapter;
  }

  public Manga() { }

  @JsonProperty("data")
  private void mapData(Map<String,Object> data) {
    Map<String,Object> attributes = (Map<String,Object>) data.get("attributes");
    this.mangaId = (String) data.get("id");
    this.title = ((Map<String,String>)attributes.get("title")).get("en");
    this.lastChapter = (String) attributes.get("lastChapter");
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getMangaId() {
    return mangaId;
  }
  public void setMangaId(String mangaId) {
    this.mangaId = mangaId;
  }
  public String getLastChapter() {
    return lastChapter;
  }
  public void setLastChapter(String lastChapter) {
    this.lastChapter = lastChapter;
  }
}
