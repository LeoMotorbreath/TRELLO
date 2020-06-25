import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from 'src/classes/User';
import { LoadService } from 'src/app/services/load.service';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { Task } from 'src/classes/task';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/classes/project';
import { RenderService } from 'src/app/services/render.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TestService } from 'src/app/services/test.service';
import { of } from 'rxjs';
import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';


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
  proccesing: boolean;
  constructor(
    private load: LoadService,
    private objectManager: ObjectManagerService,
    private activatedRoute : ActivatedRoute,
    private renderService : RenderService,
    private dataService: UserDataService,
    private auth: AuthService,
    private test: TestService,
    private router: Router,
    private clickManger: ClickableElementsManagerService

  ) { }
  @Output() onComment = new EventEmitter<any>()

  onComments(comments){
    
    this.onComment.emit(comments)
  }
  bol: boolean = true;
  ngOnInit(): void {
  this.renderService.renderLoadingWindow = true;
  this.currentUser = this.auth.getCurrentUser();
  this.load.checkUser(this.currentUser).pipe(
    catchError((er)=>{
      console.log(er);
       return of(false);
      }),
    tap((data)=>{
      if(!data){
        this.renderService.fatalError = true;
        this.router.navigate(['auth']);
      }else{
        this.currentUser = data;
        console.log('user:' ,this.currentUser)
      }
    }),
    switchMap(()=>this.activatedRoute.params),
    tap((data)  => this.task = this.objectManager.updateObjectData(this.currentUser.getUserTasks().find((task)=>task.id === +data.id),new Task())),
    tap(()  => this.project = this.currentUser.projects.find(proj=>proj.id == this.task.projectModel.id))  ,
  ).subscribe(()=>{
    this.renderService.renderLoadingWindow = false;

  })
  }

  createTaskComment(){
    this.proccesing = true;
    this.clickManger.dissable()
    let  comment = this.currentUser.createTaskComment(this.text,this.project,this.task.id);
    this.dataService.сreateComment(comment).pipe(
      catchError((err)=>{alert('что-то пошло не так!'); return of(false)}),
      tap((data)=>{
        if(data){
          this.onComments(data)
        }
      })
    ).subscribe(()=>{
      this.proccesing = false;
      this.clickManger.turnOn();
    });
  }

}
