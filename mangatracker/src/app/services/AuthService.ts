import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginResponse } from "../models/LoginResponse";
import { User } from "../models/User";

const BASE_URL = 'http://localhost:8080/user'

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${BASE_URL}/login`, null, {
      params: new HttpParams()
        .set('username', username)
        .set('password', password)
    })
  }

  signup(user: User) {
    return this.http.post<string>(`${BASE_URL}/signup`, null, {
      params: new HttpParams()
        .set('fullname', user.fullName)
        .set('email', user.email)
        .set('username', user.username)
        .set('password', user.password || '')
    });
  }
}