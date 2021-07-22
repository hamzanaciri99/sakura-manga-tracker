import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { UserInfoService } from "../services/UserInfoService";

@Injectable({providedIn: 'root'})
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private userInfoService: UserInfoService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.userInfoService.userInfo.pipe(
      take(1),
      exhaustMap(userInfo => {
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('jwt', userInfo?.jwtToken || '')
        });
        return next.handle(modifiedReq);
      })
    );
  }
}