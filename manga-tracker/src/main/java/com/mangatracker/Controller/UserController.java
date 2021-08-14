package com.mangatracker.Controller;

import com.mangatracker.Config.UserDetailsImp;
import com.mangatracker.Model.LoginResponse;
import com.mangatracker.Model.Response;
import com.mangatracker.jwt.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("user")
public class UserController {

  @Autowired
  JwtUtil jwtUtil;

  @Autowired
  AuthenticationManager authenticationManager;
  
  @Autowired
  RestTemplate restTemplate;

  @PostMapping("signup")
  public LoginResponse signup(@RequestParam("username") String username,
    @RequestParam("email") String email, @RequestParam("fullname") String fullname,
    @RequestParam("password") String password) {

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
    map.add("email", email);
    map.add("username", username);
    map.add("password", password);
    map.add("fullname", fullname);

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);

    restTemplate.postForObject("http://user-service/user/add", request , Response.class);

    return login(username, password);
  }
  

  @PostMapping("login")
  public LoginResponse login(@RequestParam("username") String username,
    @RequestParam("password") String password) {
      try { 
        Authentication authenticate = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(username, password)
        );
        
        UserDetailsImp userDetails = (UserDetailsImp) authenticate.getPrincipal();
        return new LoginResponse(userDetails.getUser(), jwtUtil.generateJwtToken(userDetails));
      } catch (AuthenticationException ex) {
        return new LoginResponse();
      }
  }

  @PutMapping
  public Response updateUserInfo(@RequestParam("field") String field,
      @RequestParam("value") String value, @RequestParam("userId") Long userId) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
    map.add("userId", userId.toString());
    map.add("field", field);
    map.add("value", value);

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
    return restTemplate.exchange("http://user-service/user", HttpMethod.PUT, request, Response.class).getBody();
  }
}
