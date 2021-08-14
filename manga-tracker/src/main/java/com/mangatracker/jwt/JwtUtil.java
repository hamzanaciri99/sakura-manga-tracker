package com.mangatracker.jwt;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.mangatracker.Model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class JwtUtil {

  private String secretKey;
  private long validity;
  private JWTVerifier verifier;

  @Autowired
  RestTemplate restTemplate;

  @Autowired
  public JwtUtil(@Value("${jwt.secretKey}") String secretKey, @Value("${jwt.validity}") long validity) {
    this.secretKey = secretKey;
    this.validity = validity;
    this.verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
  }

  public String generateJwtToken(UserDetails userDetails) {
    return JWT.create()
      .withSubject(userDetails.getUsername())
      .withIssuedAt(new Date(System.currentTimeMillis()))
      .withExpiresAt(new Date(System.currentTimeMillis() + validity))
      .sign(Algorithm.HMAC256(secretKey));
  }

  public boolean verifyJwtToken(String token) {
    return !isExpired(token) && isValidUser(token);
  }

  private boolean isValidUser(String token) {
    return restTemplate.getForEntity(
      "http://user-service/user/get/u/" + getUsername(token),
      User.class
    ).getBody() != null;
  }

  private boolean isExpired(String token) {
    return verifier.verify(token).getExpiresAt().compareTo(new Date(System.currentTimeMillis())) < 0;
  }

  public String getUsername(String token) {
    return verifier.verify(token).getSubject();
  } 

}
