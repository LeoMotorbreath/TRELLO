import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { User, IUser } from 'src/classes/User';
import { BDUser } from 'src/classes/bdUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ObjectManagerService } from './object-manager.service';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private createUser(name:string) {
    return new User(name);
  }
  private createBDUser(name:string , login:string,password:string) {
    return new BDUser(login,password,this.createUser(name));
  }
  
  
  register(email,password) {  
    return this.http.post('http://localhost:3000/api/register',{email,password});
  }
  


  constructor(
    private router:        Router,
    private auth:          AuthService,
    private http:          HttpClient,
    private objManager:    ObjectManagerService
    ){ 

    }
  }
