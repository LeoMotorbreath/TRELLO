import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';
import { of } from 'rxjs';
import { RenderService } from 'src/app/services/render.service';
import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(
    private auth:               AuthService,
    private router:             Router,
    private dataService:        UserDataService,
    private renderService:      RenderService,
    private clickManager:       ClickableElementsManagerService,
    private reg:                RegistrationService
     ) { }
  
  email      :string;
  password   : string;
  

  
  moveToRegistration(){
    
    this.router.navigate(['registration']);
    
  }
  
  validate(email, password) {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password.length > 6){
    return true
  }else{
    
    return false

  }
}
  registre(){
    if(!this.validate(this.email,this.password)){
      alert('некоректные данные! убедитесь, что вы правильно ввели email и длинна вашего пароля больше 5 символов');
      return 
    }
    this.clickManager.dissable()
    this.auth.logOut();  
    
    this.reg.register(this.email,this.password).pipe(
      
      tap((data)=>{
        if(data) {
          this.auth.setJWT((data as any).jwt);
          this.auth.setCurrentUser((data as any).user);
          this.renderService.renderNavBar = true;
          this.router.navigate(['user']);
      }})
      ).subscribe(
        
        
        res=>this.clickManager.turnOn(),
        err=>{
          this.clickManager.turnOn()
             alert('пользователь с таким email уже существует!')
        },
        ()=>console.log('completed')
        
  )
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
