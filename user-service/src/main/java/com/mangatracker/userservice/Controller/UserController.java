package com.mangatracker.userservice.Controller;

import java.util.List;

import com.mangatracker.userservice.Model.Manga;
import com.mangatracker.userservice.Model.Response;
import com.mangatracker.userservice.Model.User;
import com.mangatracker.userservice.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

  @PutMapping("/password")
  public Response updatePassword(@RequestParam("password") String password,
      @RequestParam("userId") Long userId) {
    try {
      User user = userRepository.findById(userId).get();
      user.setPassword(password);
      userRepository.save(user);
      return Response.SUCCESS;
    } catch (Exception e) {
      return Response.ERROR;
    }
  }

  @PutMapping("/username")
  public Response updateUsername(@RequestParam("username") String username,
      @RequestParam("userId") Long userId) {
    try {
      User user = userRepository.findById(userId).get();
      user.setUsername(username);
      userRepository.save(user);
      return Response.SUCCESS;
    } catch (Exception e) {
      return Response.ERROR;
    }
  }
  
}
