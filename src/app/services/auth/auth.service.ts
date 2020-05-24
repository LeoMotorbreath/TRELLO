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
      if(!this.currentUser){
        this.currentUser =  this.objManager.updateObjectData(obj,new User());
        this.currentUser.projects = this.objManager.processProjects(this.currentUser.projects);
        this.objManager.processTasks(this.currentUser.projects)
      }else{
        this.currentUser = this.objManager.updateObjectData(obj,this.currentUser);
        this.currentUser.projects = this.objManager.processProjects(this.currentUser.projects);
        this.objManager.processTasks(this.currentUser.projects)
      }
      
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
    login(login,password): Observable<any> {
      return this.http.post('http://localhost:3000/login',
        {
          login:login,
          password:password
        }
      );
  }
  
 private localStorage = window.localStorage ;
}
