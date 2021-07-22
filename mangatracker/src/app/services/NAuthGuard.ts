import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthGuard } from "./AuthGuard";
import { UserInfoService } from "./UserInfoService";

@Injectable({ providedIn: 'root' })
export class NAuthGuard implements CanActivate {

  constructor(private userInfoService: UserInfoService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userInfoService.userInfo.pipe(take(1), map(
      (userInfo) => {
        if(userInfo && userInfo.jwtToken) return this.router.createUrlTree(['/dashboard/manga-list']);;
        return true;
      }
    ));
  }
  
}