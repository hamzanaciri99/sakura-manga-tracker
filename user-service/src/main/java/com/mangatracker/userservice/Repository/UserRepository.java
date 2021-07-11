package com.mangatracker.userservice.Repository;

import java.util.List;

import com.mangatracker.userservice.Model.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{
  
  List<User> findByUsername(String username);
}
