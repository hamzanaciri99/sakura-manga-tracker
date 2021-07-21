package com.mangatracker.mangainfo.mangainfoservice.Model;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.node.ObjectNode;

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
