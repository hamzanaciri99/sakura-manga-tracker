package com.mangatracker.Config;

import java.util.Collection;
import java.util.List;

import com.mangatracker.Model.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImp implements UserDetails {

  private User user;

  public UserDetailsImp(User user) {
    this.user = user;
  }

  public User getUser() {
    return user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    // TODO Auto-generated method stub
    return List.of();
  }

  @Override
  public String getPassword() {
    // TODO Auto-generated method stub
    return user.getPassword();
  }

  @Override
  public String getUsername() {
    // TODO Auto-generated method stub
    return user.getUsername();
  }

  @Override
  public boolean isAccountNonExpired() {
    // TODO Auto-generated method stub
    return user != null;
  }

  @Override
  public boolean isAccountNonLocked() {
    // TODO Auto-generated method stub
    return user != null;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    // TODO Auto-generated method stub
    return user != null;
  }

  @Override
  public boolean isEnabled() {
    // TODO Auto-generated method stub
    return user != null;
  }
}