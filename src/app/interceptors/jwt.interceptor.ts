import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
      let JWT = JSON.parse(this.auth.getJWT())
      if(JWT){
        const paramReq = request.clone({
          headers:  request.headers.set('JWT',JWT)
          
      });
      return next.handle(paramReq)
      }else{
        return next.handle(request)
      }
      
      
  }
}
