package com.mangatracker.userservice.Repository;

import com.mangatracker.userservice.Model.Manga;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MangaRepository extends CrudRepository<Manga, Long> {
  
}
