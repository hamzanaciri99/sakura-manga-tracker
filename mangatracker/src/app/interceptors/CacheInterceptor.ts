import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class CacheInterceptor implements HttpInterceptor {

  cache: Storage = localStorage;

  constructor(private router: Router) {  }  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.router.url.startsWith('/dashboard/manga-list'))
      next.handle(req); 

    if(req.method !== 'GET') {
      // Clear cache whevener a PUT or POST or DELETE method is called
      let userInfo = this.cache.getItem('userInfo');
      this.cache.clear();
      // keep userInfo
      if(userInfo) this.cache.setItem('userInfo', userInfo);
      return next.handle(req);
    }

    // If reset header exist, refresh the cache for the current request
    if(req.headers.has('reset')) {
      this.cache.removeItem(req.url);
    }

    const cachedResponse = this.cache.getItem(req.url);
    if(cachedResponse != undefined) {
      // Create new observable from the cached response and send it again
      return of(this.deserializeResponse<any>(cachedResponse).clone());
    } else {
      return next.handle(req).pipe(
        tap(event => {
          if(event instanceof HttpResponse) {
            this.cache.setItem(req.url, this.serializeResponse(event.clone()));
          }
        })
      );
    }
  }

  serializeResponse(res: HttpResponse<any>): string {
    const response = res.clone();
    return JSON.stringify({
        headers: Object.fromEntries(
            response.headers.keys().map(
                (key: string) => [key, response.headers.getAll(key)]
            )
        ),
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: response.body
    })
  }

  deserializeResponse<T = any>(res: string): HttpResponse<T> {
    const response = JSON.parse(res);
    const headers = new HttpHeaders(response.headers);
    return new HttpResponse<T>({
        headers,
        body: response.body,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
    });
  }
}