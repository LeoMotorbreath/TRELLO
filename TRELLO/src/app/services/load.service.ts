import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserDataService } from './user-data.service';
import { Router } from '@angular/router';
import { take, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TestService } from './test.service';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  checkUser(user){
    if(user){
      return of(user)
    }else if(this.auth.getJWT()){
      return this.test.testGetUser().pipe(
        tap(data=>console.log('unprocessed data!',data)),
        tap((data)=>this.auth.setCurrentUser(data)),
        switchMap(()=>of(this.auth.getCurrentUser()))
      )
    }else{
      return of(false)
    }
  }
  constructor(private auth: AuthService,private data: UserDataService,private router : Router,private test: TestService) { }
}
