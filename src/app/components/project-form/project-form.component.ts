import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { tap } from 'rxjs/operators';
import { IUser, User } from 'src/classes/User';
import { IProject, Project } from 'src/classes/project';
import { LoadService } from 'src/app/services/load.service';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { RenderService } from 'src/app/services/render.service';


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
  private processProjects(defaultArray: any[]){
    let arr = [];
    defaultArray.forEach(el=>arr.push(this.objectManager.updateObjectData(el,new Project())));
    return arr
  }
  @Output() onChanged = new EventEmitter<boolean>();
  change() {
    this.onChanged.emit(null);
}
  createProject(name: string, defenition: string) {
    this.data.postProject(this.currentUser.createProject(name,defenition)).pipe (
      tap((data) => this.currentUser.projects = this.processProjects((data as any[]))),
      tap((data) => this.router.navigate(['project', data[data.length-1].id])),
    ).subscribe();
  }
  navigateBack(){
    console.log(1)
  }
  constructor(
    private auth: AuthService,
    private router: Router,
    private data: UserDataService,
    private load : LoadService,
    private objectManager: ObjectManagerService,
    private activatedRoute: ActivatedRoute,
    private renderService: RenderService
    ) { }

  ngOnInit() {
    this.renderService.renderNavBar = true;
    this.currentUser = this.auth.currentUser;
    if(!this.currentUser){
      this.load.check(this.currentUser).pipe (
        tap((data)=>this.currentUser = this.objectManager.updateObjectData(data,new User()))
      ).subscribe()
    }
  }

}
