package com.mangatracker.mangainfo.mangainfoservice.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MangaResponse {

  @JsonProperty("results")
  List<Manga> results;
  
  public List<Manga> getResults() {
    return results;
  }

  public void setResults(List<Manga> results) {
    this.results = results;
  }
}
