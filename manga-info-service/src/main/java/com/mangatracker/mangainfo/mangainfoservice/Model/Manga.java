package com.mangatracker.mangainfo.mangainfoservice.Model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Manga {
  
  private String title;
  private String id;
  private double lastChapter;

  public Manga(String title, String id, double lastChapter) {
    this.title = title;
    this.id = id;
    this.lastChapter = lastChapter;
  }

  @JsonProperty("data")
  private void mapData(Map<String,Object> data) {
    Map<String,Object> attributes = (Map<String,Object>) data.get("attributes");
    this.id = (String) data.get("id");
    this.title = ((Map<String,String>)attributes.get("title")).get("en");
    this.lastChapter = Double.parseDouble((String) attributes.get("lastChapter"));
  }

  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public double getLastChapter() {
    return lastChapter;
  }
  public void setLastChapter(double lastChapter) {
    this.lastChapter = lastChapter;
  }
}
