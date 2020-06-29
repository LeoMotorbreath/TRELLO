import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/classes/User';
import { Project } from 'src/classes/project';
import { tap,  } from 'rxjs/operators';
import { LoadService } from 'src/app/services/load.service';
import { RenderService } from 'src/app/services/render.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private load: LoadService,
    public render: RenderService,
    
    ) { }
    projects: Project[]
    user: IUser;
    renderForm: boolean = false;

    ngOnInit(): void {
        this.user = this.auth.currentUser;
        this.load.checkUser(this.user).pipe(
          tap((data)=>this.auth.setCurrentUser(data)),
          tap((data)=>this.user = this.auth.currentUser),
          tap(()=>this.projects = this.user.projects),
        ).subscribe(()=>{  
          this.render.renderNavBar = true;
        });
      }   
  navigateToProject(id){
    this.router.navigate(['project',id]);
  }
  
  navigateToActiveUser(){
    this.router.navigate(['user'])
  }

  initForm(){
    this.renderForm = true;
  }
  
  turnOffProjectForm(){
    this.renderForm = false;
  }
}

