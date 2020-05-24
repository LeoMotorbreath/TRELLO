import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ITask, Task } from 'src/classes/task';
import { IUser, User } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IProject, Project } from 'src/classes/project';
import { LoadService } from 'src/app/services/load.service';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { RenderService } from 'src/app/services/render.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { IComment, TaskComment } from 'src/classes/comment';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private load: LoadService,
    private objectManager : ObjectManagerService,
    private renderService: RenderService,
    private dataService: UserDataService,
    private cdRef: ChangeDetectorRef
    ) { }
  task : Task;
  projectId: number;
  project: Project
  currentUser: IUser
  commentInput: boolean = false;
  text:string;
  invite: boolean;
  invalidInvite: boolean;
  
  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    this.renderService.renderNavBar = true;
    
      this.load.check(this.currentUser).pipe (
        tap((data)  => this.currentUser = this.objectManager.updateObjectData(data,new User())),
        switchMap(()=> this.activatedRoute.params),
        tap((data)  => this.task = this.objectManager.updateObjectData(this.currentUser.getUserTasks().find((task)=>task.id === +data.id),new Task())),
        tap((data)  => this.project = this.currentUser.projects.find(proj=>proj.id == this.task.projectModel.id))  ,
        ).subscribe();
  }
  toggleInviteRendering(){
    this.invite = !this.invite;
  }
  navigateToProject(){
    this.router.navigate(['project',this.project.id]);
  }
  toggleCommentInput() {
    this.commentInput = !this.commentInput;
  }
  kostil() {
    return true;
  }
  onComment(comments){
    this.commentInput = !this.commentInput;
    console.log(comments)
  }
  onInvite(invite$: Observable<any>){
   
    invite$.pipe(
      // catchError((err)=>of(false)),
      // tap((data)=>{if(!data){
      //   this.invalidInvite = true;
      // }else{
      //   console.log(data)
      //   this.task.invited = data;
      // }
    tap((data)=>console.log(data))
  ).subscribe()
  }
  deleteComment(comment:TaskComment) {
    this.dataService.deleteComment(this.task,comment).pipe(
      tap((data)=>console.log(1)),
      tap((data)=>{if(!data){
        console.log(this.task.comments.findIndex((cm)=>cm === comment))
      }}),
      tap(()=>console.log(this.task.comments)),
    ).subscribe()
  }
}
