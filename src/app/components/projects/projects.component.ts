import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/classes/User';
import { IProject } from 'src/classes/project';
import { UserDataService } from 'src/app/services/user-data.service';
import { tap, take } from 'rxjs/operators';
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
    private dataService: UserDataService,
    private router: Router,
    private load: LoadService,
    private activatedRoute: ActivatedRoute,
    public renderService: RenderService
    ) { }

  user: IUser = this.auth.currentUser;
  navigateToProject(id){
    this.router.navigate(['project',id]);
  }
  navigateToActiveUser(){
    this.router.navigate(['user'])
  }
  navigateToProjectForm(){
    this.router.navigate(['projectForm'])
  }
  

  ngOnChanges(){
   
  }
  ngOnInit(): void {
    this.renderService.renderNavBar = true;
    this.user = this.auth.currentUser;
    if(!this.user){
      this.load.check(this.auth.currentUser).pipe(
        tap((data)=>this.user = data)
      ).subscribe();
      
    }
    
    }   
  }

