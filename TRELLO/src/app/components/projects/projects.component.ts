import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/classes/User';
import { IProject, Project } from 'src/classes/project';
import { UserDataService } from 'src/app/services/user-data.service';
import { tap, take } from 'rxjs/operators';
import { LoadService } from 'src/app/services/load.service';
import { RenderService } from 'src/app/services/render.service';
import { TestService } from 'src/app/services/test.service';
import { ObjectManagerService } from 'src/app/services/object-manager.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private dataService: UserDataService,
    private router: Router,
    private load: LoadService,
    private activatedRoute: ActivatedRoute,
    public render: RenderService,
    private test: TestService,
    private objectManager: ObjectManagerService
    ) { }

    ngOnInit(): void {
        this.render.renderLoadingWindow = true;
        this.user = this.auth.currentUser;
        this.load.checkUser(this.user).pipe(
          tap((data)=>this.auth.setCurrentUser(data)),
          tap((data)=>this.user = this.auth.currentUser),
          tap(()=>this.projects = this.user.projects),
        ).subscribe(()=>{  
          this.render.renderLoadingWindow = false;
          this.render.renderNavBar = true;
        });
      }   
  projects: Project[]
  user: IUser;
  renderForm: boolean = false;
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

