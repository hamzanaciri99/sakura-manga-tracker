package com.mangatracker.userservice.Controller;

import java.util.stream.Collectors;

import com.mangatracker.userservice.Model.Manga;
import com.mangatracker.userservice.Model.Response;
import com.mangatracker.userservice.Model.User;
import com.mangatracker.userservice.Repository.MangaRepository;
import com.mangatracker.userservice.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("manga")
public class MangaController {

  @Autowired
  MangaRepository mangaRepository;
  @Autowired
  UserRepository userRepository;

  @PostMapping("add")
  public Response addManga(@RequestParam("userId") Long userId,
      @RequestParam("mangaId") String mangaId,
      @RequestParam("status") String status) {
    try {
      User user = userRepository.findById(userId).get();
      Manga manga = new Manga();
      manga.setMangaId(mangaId);
      manga.setStatus(status);
      user.getMangas().add(manga);
      mangaRepository.save(manga);
      return Response.SUCCESS;
    } catch (Exception e) {
      e.printStackTrace();
      return Response.ERROR;
    }
  }

  @DeleteMapping("delete")
  public Response deleteManga(@RequestParam("userId") Long userId,
      @RequestParam("mangaId") String mangaId) {
    try {
      User user = userRepository.findById(userId).get();
      Manga manga = user.getMangas()
        .stream()
        .filter(m -> m.getMangaId().equals(mangaId))
        .collect(Collectors.toList()).get(0);
      user.getMangas().remove(manga);
      userRepository.save(user);
      mangaRepository.delete(manga);
      return Response.SUCCESS;
    } catch (Exception e) {
      e.printStackTrace();
      return Response.ERROR;
    }
  }

  @PutMapping("status")
  public Response updateStatus(@RequestParam("userId") Long userId,
      @RequestParam("mangaId") String mangaId, @RequestParam("status") String status) {
    try {
      User user = userRepository.findById(userId).get();
      Manga manga = user.getMangas()
        .stream()
        .filter(m -> m.getMangaId().equals(mangaId))
        .collect(Collectors.toList()).get(0);
      manga.setStatus(status);
      mangaRepository.save(manga);
      return Response.SUCCESS;
    } catch (Exception e) {
      e.printStackTrace();
      return Response.ERROR;
    }
  }

  @PutMapping("lastChapter")
  public Response updateLastChapter(@RequestParam("userId") Long userId,
      @RequestParam("mangaId") String mangaId, @RequestParam("lastChapter") double lastChapter) {
    try {
      User user = userRepository.findById(userId).get();
      Manga manga = user.getMangas()
        .stream()
        .filter(m -> m.getMangaId().equals(mangaId))
        .collect(Collectors.toList()).get(0);
      manga.setLastChapter(lastChapter);;
      mangaRepository.save(manga);
      return Response.SUCCESS;
    } catch (Exception e) {
      e.printStackTrace();
      return Response.ERROR;
    }
  }

}
