package com.mangatracker.userservice.Controller;

import java.util.List;

import com.mangatracker.userservice.Model.Manga;
import com.mangatracker.userservice.Model.Response;
import com.mangatracker.userservice.Model.User;
import com.mangatracker.userservice.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {
  
  @Autowired
  UserRepository userRepository;

  @PostMapping("/add")
  public Response addUser(@RequestParam("email") String email, 
      @RequestParam("fullname") String fullName, @RequestParam("username") String username,
      @RequestParam("password") String password) {
    try {
      User user = new User(null, fullName, email, username, password);
      userRepository.save(user);
      return Response.SUCCESS;
    } catch (Exception e)  {
      return Response.ERROR;
    }
  }

  @GetMapping("/get/u/{username}")
  public User getUserByUserName(@PathVariable("username") String username) {
    List<User> res = userRepository.findByUsername(username);
    return res.size() > 0 ? res.get(0) : null;
  }

  @GetMapping("{userId}/getMangas")
  public List<Manga> getMangas(@PathVariable("userId") Long userId) {
    try {
      return userRepository.findById(userId).get().getMangas();
    } catch (Exception e){
      return null;
    }
  }

  @PutMapping
  public Response updateUserInfo(@RequestParam("field") String field,
      @RequestParam("value") String value, @RequestParam("userId") Long userId) {
    try {
      User user = userRepository.findById(userId).get();
      setUserField(field, value, user);
      userRepository.save(user);
      return Response.SUCCESS;
    } catch (Exception e) {
      return Response.ERROR;
    }
  }

  private void setUserField(String field, String value, User user) {
    switch(field) {
      case "fullName": user.setFullName(value); break;
      case "username": user.setUsername(value); break;
      case "email": user.setEmail(value); break;
      case "password": user.setPassword(value); break;
    }
  }
  
}
