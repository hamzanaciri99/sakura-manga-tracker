package com.mangatracker.userservice.Repository;

import java.util.List;
import java.util.Optional;

import com.mangatracker.userservice.Model.Manga;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MangaRepository extends CrudRepository<Manga, Long> {
  
}
