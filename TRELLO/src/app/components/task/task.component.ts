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
import { of, Observable } from 'rxjs';
import { Comment_ } from 'src/classes/comment';
import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';

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
    private cdRef: ChangeDetectorRef,
    private clickManager: ClickableElementsManagerService
    ) { }
  task : Task;
  projectId: number;
  project: Project
  currentUser: User
  commentInput: boolean = false;
  text:string;
  invite: boolean;
  invalidInvite: boolean;
  inviteData;
  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    this.renderService.renderNavBar = true;
    
      this.load.checkUser(this.currentUser).pipe (
        tap((data)  => this.currentUser = this.objectManager.updateObjectData(data,new User())),
        switchMap(()=> this.activatedRoute.params),
        tap((data)  => this.task = this.objectManager.updateObjectData(this.currentUser.getUserTasks().find((task)=>task.id === +data.id),new Task())),
        tap((data)  => this.project = this.currentUser.projects.find(proj=>proj._id == this.task.projectModel.id))  ,
        tap(()=>this.inviteData = {inviter:this.currentUser, inviteTo: this.task}),
        tap(()=>console.log(this.task)),
        tap(()=>{
          let x = this.currentUser.getUserTasks();
          this.currentUser.tasks =  this.currentUser.tasks.map(task=>task = x.find(tk=>tk.id == task));
        })
        ).subscribe();
        
      }

  toggleInviteRendering(){
    this.invite = !this.invite;
  }
  navigateToProject(){
    this.router.navigate(['project',this.project._id]);
  }
  toggleCommentInput() {
    this.commentInput = !this.commentInput;
  }

  onComment(comments: Comment_[]){
    this.commentInput = !this.commentInput;
    this.task.comments = comments
  }
  onInvite(data){
   console.log('inTask:',data)
   this.task.invited = data;
  }
  deleteComment(comment:Comment_) {
    if(this.clickManager.dissabled){
      return
    }
    let bol =  confirm('вы уверены что хотите удалить комментарий?')
    if(!bol){
      return
    }
    this.clickManager.dissable()
    this.dataService.deleteComment(this.task,comment).pipe(
      catchError((err)=> of(false)),
      tap((data)=>{if(data){
        this.task.comments.splice(this.task.comments.findIndex(com=>com.id == comment.id))
      }}),
      tap(()=>console.log(this.task.comments)),
    ).subscribe(()=>{
      this.clickManager.turnOn()
    })
  }
  goBack(){
    this.router.navigate(['project',this.task.projectModel.id])
  }
}
