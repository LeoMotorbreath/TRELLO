import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import { IUser, User } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { tap, switchMap, switchAll, map, mergeMap, concatMap, catchError } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';
import { of, from } from 'rxjs';
import { KeyValuePipe } from '@angular/common';
import { RenderService } from 'src/app/services/render.service';
import { TestService } from 'src/app/services/test.service';
import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';

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
    public test: TestService,
    private clickManager: ClickableElementsManagerService
     ) { }
  
  email      :string;
  password   : string;
  
  
  moveToRegistration(){
    
    this.router.navigate(['registration']);
    
  }
  private navigateToUser(){
    this.router.navigate(['user'])
  }
  login(){
    this.clickManager.dissable();
    this.auth.login(this.email,this.password).pipe(
      catchError((err)=>of(false)),
      tap((data )=>{
        if(!data){
          alert('Пользователь не найден')
        }else{
          this.auth.setJWT((data as any) .token);
          this.auth.setCurrentUser((data as any).user);
          this.renderService.renderNavBar = true;
          this.router.navigate(['user'])
        }
      }),
    ).subscribe(()=>{
      this.clickManager.turnOn();
    
    });
  }
  
  
  
  getUser(){
    this.dataService.getUser()
  }
  ngOnInit(): void {
    this.renderService.renderNavBar = false;
    
  }

}
