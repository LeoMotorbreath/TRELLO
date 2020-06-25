import { Injectable } from '@angular/core';
import { IUser, User } from 'src/classes/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { ObjectManagerService } from '../object-manager.service';
import { RenderService } from '../render.service';
import { Task } from 'src/classes/task';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:User
  constructor(
    private router:       Router,
    private http:         HttpClient,
    private objManager:   ObjectManagerService,
    private render    :   RenderService
    ){}
    
    setCurrentUser(obj): void{ 
        this.currentUser =  this.objManager.updateObjectData(obj,new User());
        this.currentUser.projects = this.objManager.processEnitys(this.currentUser.projects);
        this.objManager.processTasks(this.currentUser.projects);
        this.currentUser.findUserTaskById()
    }

    getCurrentUser(){
      return this.currentUser
    }

    setJWT(jwt:string): void {

      this.localStorage.setItem('userJWT',JSON.stringify(jwt));
      this.router.navigate['navigation'];
    }
    logOut() {
      this.render.renderArr = this.render.renderArr.map((elem)=>elem = false);
      this.localStorage.removeItem('userJWT');
      this.currentUser = null;
    }
    getJWT(): string { 
      return this.localStorage.getItem('userJWT');
    }


  login(email,password) {
    return this.http.post('http://localhost:3000/api/auth/login', {email,password});
  }
  getUser() {
    return this.http.get('http://localhost:3000/api/auth/user')
  }
  
 private localStorage = window.localStorage ;
}
