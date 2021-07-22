package com.mangatracker.Model;

public class LoginResponse {
  String jwtToken;
  NoPasswordUser user;

  public void setJwtToken(String jwtToken) {
    this.jwtToken = jwtToken;
  }

  public String getJwtToken() {
    return jwtToken;
  }

  public NoPasswordUser getUser() {
    return user;
  }

  public void setUser(NoPasswordUser user) {
    this.user = user;
  }

  public LoginResponse(User user, String jwtToken) {
    this.user = new NoPasswordUser(user);
    this.jwtToken = jwtToken;
  }

  public LoginResponse() { }

  class NoPasswordUser {
    Long id;
    String fullName;
    String email;
    String username;

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

    public NoPasswordUser() { }

    public NoPasswordUser(User user) {
      this.id = user.getId();
      this.fullName = user.getFullName();
      this.email = user.getEmail();
      this.username = user.getUsername();
    }
    
  }
}