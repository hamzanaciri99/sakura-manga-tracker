package com.mangatracker.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Manga {
  
  private String status;
  @JsonProperty("mangaId")
  private String id;
  private String lastChapter;
  private String title;

  public Manga(String status, String id, String lastChapter) {
    this.status = status;
    this.id = id;
    this.lastChapter = lastChapter;
  }

  public Manga() { }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
  }
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getLastChapter() {
    return lastChapter;
  }
  public void setLastChapter(String lastChapter) {
    this.lastChapter = lastChapter;
  }
}
