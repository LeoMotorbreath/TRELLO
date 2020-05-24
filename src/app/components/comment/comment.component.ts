import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/classes/User';
import { LoadService } from 'src/app/services/load.service';
import { tap, switchMap } from 'rxjs/operators';
import { Task } from 'src/classes/task';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/classes/project';
import { RenderService } from 'src/app/services/render.service';
import { IComment, TaskComment } from 'src/classes/comment';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  text: string;
  currentUser: User;
  task: Task;
  project: Project
  constructor(
    private load: LoadService,
    private objectManager: ObjectManagerService,
    private activatedRoute : ActivatedRoute,
    private renderService : RenderService,
    private dataService: UserDataService,
    private auth: AuthService

  ) { }
  @Output() onComment = new EventEmitter<any>()
  onComments(comments){
    
    this.onComment.emit(comments)
  }
  bol: boolean = true;
  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    this.load.check(this.currentUser).pipe (
      tap((data)  => this.currentUser = this.objectManager.updateObjectData(data,new User())),
      switchMap(()=> this.activatedRoute.params),
      tap((data)  => this.task = this.objectManager.updateObjectData(this.currentUser.getUserTasks().find((task)=>task.id === +data.id),new Task())),
      tap(()  => this.project = this.currentUser.projects.find(proj=>proj.id == this.task.projectModel.id))  ,
  ).subscribe();
  this.renderService.renderNavBar = true;
  }

  createComment(){
     this.dataService.commentTask(this.currentUser.createComment(this.text,this.project,this.task.id)).pipe(
        tap((data)=>this.task.comments = (data as TaskComment[])),
        tap(()=> {
          this.text = "";
        }),
        tap(()=>this.onComments(this.task.comments))
     ).subscribe();  
  }
  

}
