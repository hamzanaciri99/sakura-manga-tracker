import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoginResponse } from "../models/LoginResponse";


@Injectable({ providedIn: 'root' })
export class UserInfoService {

  userInfo = new BehaviorSubject<LoginResponse | null>(null);

  constructor() {
    this.userInfo.next(JSON.parse(localStorage.getItem('userInfo') || 'null'));
  }

  register(userInfo: LoginResponse) {
    if(userInfo && userInfo.jwtToken) {
      this.userInfo.next(userInfo);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }

  clear() {
    localStorage.removeItem('userInfo');
    this.userInfo.next(null);
  }

}