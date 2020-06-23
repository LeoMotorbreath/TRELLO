import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { tap } from 'rxjs/operators';
import { IUser, User } from 'src/classes/User';
import { IProject, Project } from 'src/classes/project';
import { LoadService } from 'src/app/services/load.service';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { RenderService } from 'src/app/services/render.service';
import { TestService } from 'src/app/services/test.service';
import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  
  currentUser: IUser = this.auth.currentUser;
  projectName: string;
  projectDefenition: string;
  
  navigateToProjects(): void{
    this.router.navigate(['projects'])
  }
  @Output() onCancel = new EventEmitter<boolean>();
  
  cancel() {
    
    this.onCancel.emit(false);
  }  

  createProject(name,def){
    this.clicksManager.dissable();
    this.data.postProject(this.currentUser.createProject(name,def)).pipe(
      tap((data)=>this.auth.currentUser.projects = this.objectManager.processEnitys((data as any).projects)),
      tap(()=>console.log(this.currentUser.projects)),
      tap(()=>this.router.navigate(['project',this.auth.currentUser.projects[this.auth.currentUser.projects.length-1].id]))
    ).subscribe(()=>{
      this.render.renderLoadingWindow = false;
      this.clicksManager.turnOn();
    })
  }
  constructor(
    private auth: AuthService,
    private router: Router,
    private data: UserDataService,
    private load : LoadService,
    private objectManager: ObjectManagerService,
    private activatedRoute: ActivatedRoute,
    private renderService: RenderService,
    private render: RenderService,
    private test: TestService,
    private clicksManager: ClickableElementsManagerService,
    ) { }

  ngOnInit() {
    this.renderService.renderNavBar = true;
    this.currentUser = this.auth.currentUser;
    if(!this.currentUser && this.auth.getJWT()){
      this.test.testGetUser().subscribe((data)=>{
        this.auth.setCurrentUser(data);
        this.currentUser = this.auth.getCurrentUser();
      })
    }
  }
}
