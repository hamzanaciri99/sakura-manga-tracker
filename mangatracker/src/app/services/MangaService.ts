import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Manga } from "../models/Manga";
import { Response } from "../models/Response";

const BASE_URL = 'http://localhost:8080/manga';

@Injectable({ providedIn: 'root' })
export class MangaService {

  constructor(private http: HttpClient) { }

  search(title: string) {
    return this.http.get<Array<Manga>>(`${BASE_URL}/search/${title}`);
  }

  add(userId: number, mangaId: string, status: string) {
    return this.http.post<Response>(`${BASE_URL}/add`, null, {
      params: new HttpParams()
        .set('mangaId', mangaId)
        .set('userId', userId)
        .set('status', status)
    });
  }

  delete(userId: number, mangaId: string) {
    return this.http.delete<Response>(`${BASE_URL}`, {
      params: new HttpParams()
        .set('mangaId', mangaId)
        .set('userId', userId)
    });
  }

  updateLastChapter(userId: number, mangaId: string, lastChapter: string | number) {
    return this.http.put<Response>(`${BASE_URL}/lastChapter`, null, {
      params: new HttpParams()
        .set('mangaId', mangaId)
        .set('userId', userId)
        .set('lastChapter', lastChapter)
    });
  }

  updateStatus(userId: number, mangaId: string, status: string) {
    return this.http.put<Response>(`${BASE_URL}/status`, null, {
      params: new HttpParams()
        .set('mangaId', mangaId)
        .set('userId', userId)
        .set('status', status)
    });
  }

  getUserManga(userId: number) {
    return this.http
        .get<Array<Manga>>(`${BASE_URL}/user/${userId}`)
        .pipe(
          map((manga: Manga[]) => this.getInfo(manga))
        );
  }

  getInfo(manga: Manga[]) {
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