package com.mangatracker.Controller;

import java.util.Collection;
import java.util.List;

import com.mangatracker.Config.SecurityConfig;
import com.mangatracker.Model.User;
import com.mangatracker.jwt.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

  @Autowired
  JwtUtil jwtUtil;

  @Autowired
  AuthenticationManager authenticationManager;
  

  @PostMapping("login")
    public String login(@RequestParam("username") String username,
      @RequestParam("password") String password) {
        try {
          Authentication authenticate = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
          );
          
          UserDetails user = (UserDetails) authenticate.getPrincipal();
          return jwtUtil.generateJwtToken(user);
        } catch (BadCredentialsException ex) {
            return null;
        }
    }
}
