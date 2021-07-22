import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { Manga } from "../models/Manga";

const BASE_URL = 'http://localhost:8080/manga';

interface Response {status: 'SUCCESS' | 'ERROR'};

@Injectable({ providedIn: 'root' })
export class MangaService {

  constructor(private http: HttpClient) { }

  search(title: string) {
    return this.http.get<Array<Manga>>(`${BASE_URL}/search/${title}`);
  }

  add(userId: string, mangaId: string, status: string) {
    return this.http.post<Response>(`${BASE_URL}/add`, null, {
      params: new HttpParams()
        .set('mangaId', mangaId)
        .set('userId', userId)
        .set('status', status)
    });
  }

  delete(userId: string, mangaId: string) {
    return this.http.delete<Response>(`${BASE_URL}`, {
      params: new HttpParams()
        .set('mangaId', mangaId)
        .set('userId', userId)
    });
  }

  updateLastChapter(userId: string, mangaId: string, lastChapter: string | number) {
    return this.http.put<Response>(`${BASE_URL}/lastChapter`, null, {
      params: new HttpParams()
        .set('mangaId', mangaId)
        .set('userId', userId)
        .set('lastChapter', lastChapter)
    });
  }

  updateStatus(userId: string, mangaId: string, status: string) {
    return this.http.put<Response>(`${BASE_URL}/status`, null, {
      params: new HttpParams()
        .set('mangaId', mangaId)
        .set('userId', userId)
        .set('status', status)
    });
  }

  getUserManga(userId: string) {
    return this.http
        .get<Array<Manga>>(`${BASE_URL}/user/${userId}`)
        .pipe(
          map((manga: Manga[]) => this.getInfo(manga))
        );
  }

  getInfo(manga: Manga[]) {
    console.log(manga);
    console.log(typeof manga);
    manga.forEach(m => {
      this.http
        .get<Manga>(`${BASE_URL}/${m.mangaId}`)
        .subscribe(result => {
          m.title = result.title;
          m.lastRead = m.lastChapter;
          m.lastChapter = result.lastChapter; 
        })
    });
    return manga;
  }

}