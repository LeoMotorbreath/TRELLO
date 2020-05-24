import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { IUser, User } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ITask } from 'src/classes/task';
import { NavbarService } from 'src/app/services/navbar.service';
import { LoadService } from 'src/app/services/load.service';
import { RenderService } from 'src/app/services/render.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user : User ;
  tasks: ITask[] ;
  
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
  constructor(
    private auth:           AuthService,
    private router:         Router,
    private navbarSerivce:  NavbarService,
    private load         :  LoadService,
    private render       :  RenderService
    ) { }

  ngOnInit(): void {
    this.load.check(this.user).pipe(
      tap((data)=>this.user = data),
      tap(()=>this.render.renderNavBar = true),
      tap(()=>this.navbarSerivce.toggleActive('user')),
      tap(()=>console.log(this.navbarSerivce.paths)),
      tap(()=>console.log(this.user)),
      tap(()=>this.tasks = this.user.tasks)
      
    ).subscribe()
  }

}
