import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { fromEvent } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';
import { IUser, User } from 'src/classes/User';
import { RenderService } from 'src/app/services/render.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
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
    ) { }
    navigateToProjects(){
      this.renderService.renderNavBar = true;
      this.router.navigate(['projects']);
    }
   
  registrateUser(name,login,password){
    this.reg.registrateUser(name,login,password).pipe(
      tap(
        data=>this.auth.setJWT((data as string)),
      ),
      switchMap(()=> this.data.getUser()),
      tap((data)=>this.auth.setCurrentUser(new User((data as IUser).name,(data as IUser).id))),
      tap(()=>this.renderService.renderNavBar = true),
      tap(()=> this.router.navigate(['user']))
    ).subscribe()
  }
  

    setTouched(...args){
      args.forEach((element)=>{
        if(element.touched!==undefined){
          element.touched = true 
        }
      })
    }
  ngOnInit(): void {
  }

}
