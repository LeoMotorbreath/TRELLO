import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {  User } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ITask } from 'src/classes/task';
import { NavbarService } from 'src/app/services/navbar.service';
import { LoadService } from 'src/app/services/load.service';
import { RenderService } from 'src/app/services/render.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user : User ;
  tasks: ITask[] ;
  
  constructor(
    private auth:           AuthService,
    private router:         Router,
    private navbarSerivce:  NavbarService,
    private load         :  LoadService,
    private render       :  RenderService,
    ) { 

    }
  navigateToActiveUser():void {
    this.navbarSerivce.toggleActive('user');
    this.router.navigate(['user']);
  }

  navigateToProject(id: number) {
    this.navbarSerivce.toggleActive();
    this.router.navigate(['project',id]);
  }
  navigateToTask(id:string){
    this.navbarSerivce.toggleActive();
    this.router.navigate(['task',id]);
  }
  navigateToProjects(){
    this.navbarSerivce.toggleActive('projects');
    this.router.navigate(['projects']);
  }
  navigateToTasks(){
    this.navbarSerivce.toggleActive('tasks')
    this.router.navigate(['tasks'])
  }
    
  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    this.render.renderNavBar = true;
    this.load.checkUser(this.user).pipe(
      catchError((er)=>{ return of(false)}),
      tap((data)=>{
        if(!data){
          this.router.navigate([''])
        }else{
          this.user = data;
        }
      })
    ).subscribe((s)=>{
      this.render.renderNavBar = true;
      this.navbarSerivce.toggleActive('user')
      this.render.renderLoadingWindow = false;
    }),
    (er)=>{
      alert('произошла ошибка авторизации, пройдите ее заново'); this.router.navigate['auth']
    }
  }
  
}
