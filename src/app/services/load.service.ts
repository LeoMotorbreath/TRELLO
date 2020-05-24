import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserDataService } from './user-data.service';
import { Router } from '@angular/router';
import { take, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  check(user){
    if(!user) {
      if(this.auth.getJWT()){
        return this.data.getUser().pipe(
          tap((data)=>this.auth.setCurrentUser(data)),
          switchMap(()=> of(this.auth.getCurrentUser())),
        )
      }else{
        return of(new Error())
      }
    }else{
      return of(user)
    }
  }
  constructor(private auth: AuthService,private data: UserDataService,private router : Router,private dataService: UserDataService) { }
}
