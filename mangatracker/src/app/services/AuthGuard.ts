import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { UserInfoService } from "./UserInfoService";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private userInfoService: UserInfoService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.userInfoService.userInfo.pipe(take(1), map(
      (userInfo) => {
        if (userInfo && userInfo.jwtToken) return true;
        return this.router.createUrlTree(['/login']);
      }
    ));
  }
}