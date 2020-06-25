import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { fromEvent, of, Subject, throwError } from 'rxjs';
import { tap, map, switchMap, catchError, takeUntil, debounceTime } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';
import { IUser, User } from 'src/classes/User';
import { RenderService } from 'src/app/services/render.service';
import { ThrowStmt } from '@angular/compiler';
import { TestService } from 'src/app/services/test.service';
import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  {
  name: string ;
  login:string  ;
  password:string ;
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private reg: RegistrationService,
    private data: UserDataService,
    private activatedRoute: ActivatedRoute,
    private renderService: RenderService,
    public test: TestService,
    private clickManager : ClickableElementsManagerService,
    
    ) { }
    validate(email, password) {

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password.length > 6){
      return true
    }else{
      
      return false

    }
}
    goToAuth(){
      this.router.navigate(['auth'])
    }
    
    registre(email,password){
      if(!this.validate(email,password)){
        alert('некоректные данные! убедитесь, что вы правильно ввели email и длинна вашего пароля больше 5 символов');
        return 
      }
      this.clickManager.dissable()
      this.auth.logOut();  
      
      this.reg.register(email,password).pipe(
        
        tap((data)=>{
          if(data) {
            this.auth.setJWT((data as any).jwt);
            this.auth.setCurrentUser((data as any).user);
            this.renderService.renderNavBar = true;
            this.router.navigate(['user']);
        }})
        ).subscribe(
          
          // {
          //   next(data){
          //     this.clickManager.turnOn();
          //   },
          //   error(err){
          //     this.clickManager.turnOn()
          //     alert('пользователь с таким email уже существует!')
          //   },
            
          // },
          res=>this.clickManager.turnOn(),
          err=>{
            this.clickManager.turnOn()
               alert('пользователь с таким email уже существует!')
          },
          ()=>console.log('completed')
          
    )
  }
}
