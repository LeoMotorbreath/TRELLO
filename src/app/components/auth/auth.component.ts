import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import { IUser, User } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { tap, switchMap, switchAll, map, mergeMap, concatMap } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';
import { of, from } from 'rxjs';
import { KeyValuePipe } from '@angular/common';
import { RenderService } from 'src/app/services/render.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router : Router,
    private dataService: UserDataService,
    private activatedRoute : ActivatedRoute,
    private renderService:  RenderService,
     ) { }
  
  userLogin   :string;
  userPassword: string;
  
  
  moveToRegistration(){
    
    this.router.navigate(['registration']);
    
  }
  private navigateToUser(){
    this.router.navigate(['user'])
  }

 
  
  login(userLogin,userPassword) {
    this.auth.login(userLogin,userPassword).pipe(
      tap((data)=>this.auth.setJWT(data)),
      switchMap(()=>this.dataService.getUser()),
      tap((data)=>this.auth.setCurrentUser(data)),
      tap((data)=>console.log(data)),
      tap(()=>this.renderService.renderNavBar = true),
      tap(()=>this.navigateToUser()),
      
      ).subscribe()
  }
  getUser(){
    this.dataService.getUser()
  }
  ngOnInit(): void {
    this.renderService.renderNavBar = false;
    
  }

}
