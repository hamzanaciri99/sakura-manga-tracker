package com.mangatracker.userservice.Model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table
public class Manga implements Serializable {

  @GeneratedValue @Id Long id;
  private String mangaId;
  private double lastChapter;
  private String status;

  public Manga(String mangaId, double lastChapter) {
    this.mangaId = mangaId;
    this.lastChapter = lastChapter;
  }

  public Manga() { }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
  
  public String getMangaId() {
    return mangaId;
  }

  public void setMangaId(String mangaId) {
    this.mangaId = mangaId;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public double getLastChapter() {
    return lastChapter;
  }
  public void setLastChapter(double lastChapter) {
    this.lastChapter = lastChapter;
  }
  
}