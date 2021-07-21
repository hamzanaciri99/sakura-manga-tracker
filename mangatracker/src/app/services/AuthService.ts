import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

interface UserDetails {
  fullname: string;
  email: string;
  username: string;
  password: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }


  signup(user: UserDetails) {
    return this.http.post<string>('http://localhost:8080/user/signup', user, {
      params: new HttpParams()
        .set('fullname', user.fullname)
        .set('email', user.email)
        .set('username', user.username)
        .set('password', user.password)
    });
  }
}