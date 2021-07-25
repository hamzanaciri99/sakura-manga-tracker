package com.mangatracker.userservice.Model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table
public class User implements Serializable {
  
  @GeneratedValue @Id 
  private Long id;
  private String fullName;
  @Column(unique = true)
  private String email;
  @Column(unique = true)
  private String username;
  private String password;
  @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  private List<Manga> mangas;

  public User() { }

  public User(Long id, String fullName, String email, String username, String password) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.username = username;
    this.password = password;
  }

  public List<Manga> getMangas() {
    return mangas;
  }

  public void setMangas(List<Manga> mangas) {
    this.mangas = mangas;
  }
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getFullName() {
    return fullName;
  }
  public void setFullName(String fullName) {
    this.fullName = fullName;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getUsername() {
    return username;
  }
  public void setUsername(String username) {
    this.username = username;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }

  
}
