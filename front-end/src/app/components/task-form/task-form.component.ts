import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { IProject, Project } from 'src/classes/project';
import { ITaskList, TaskList } from 'src/classes/task-list';
import { IUser, User } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Task } from 'src/classes/task';
import { UserDataService } from 'src/app/services/user-data.service';
import { LoadService } from 'src/app/services/load.service';
import { tap, switchMap, debounceTime, debounce } from 'rxjs/operators';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { RenderService } from 'src/app/services/render.service';
import { TestService } from 'src/app/services/test.service';
import { Model } from 'src/classes/model';
import { timer, interval } from 'rxjs';
import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  
  constructor(
    private auth           : AuthService,
    private router         : Router,
    private activatedRoute : ActivatedRoute,
    private dataService    : UserDataService,
    private load           : LoadService,
    private objManager     : ObjectManagerService,
    private renderService  : RenderService,
    private ref            : ChangeDetectorRef,
    private test           : TestService,
    private clicksManager  : ClickableElementsManagerService,
    private taskService    : TaskService
    ) { }
    @Output() onCancel = new EventEmitter<boolean>();
    @Output() onTasks = new EventEmitter<any>();
    @ViewChild ('button') button: HTMLButtonElement;
    toggle() {
      this.onCancel.emit(false);
  }
    sendTasksToParentComponent(tasks){
      this.onTasks.emit(tasks);
    }
   
  taskName:string;
  taskText:string;
  user: User;
  projId: number;
  project:Project;
  but: HTMLElement;
  inProcess: boolean = false
  postTask(name,defenition?){
    this.clicksManager.dissable();
    this.inProcess = true;
    let task  = this.user.createTask(name,this.project,defenition)
    this.taskService.createTask(task).pipe(
      tap(()=>this.inProcess = false),
      tap((data)=>this.project.taskLists[0].tasks.push (this.objManager.updateObjectData((data as object) ,new Task()))),
      tap(()=>this.inProcess = false),
      tap(()=>this.router.navigate(['task',this.project.taskLists[0].tasks[this.project.taskLists[0].tasks.length - 1 ].id]))
    ).subscribe((data)=> {
      this.clicksManager.turnOn();
      this.inProcess = false;
      this.renderService.renderTaskForm = false;
    })    
  }
  
  ngOnInit(){
    this.renderService.renderLoadingWindow = true;
    this.user = this.auth.getCurrentUser();
      this.load.checkUser(this.user).pipe(
        tap((data)=>{
          if(!data){
            this.router.navigate['auth']
          }else{
            this.auth.setCurrentUser(data);
            this.user = this.auth.getCurrentUser();
          }
        }),
        switchMap(()=> this.activatedRoute.params),
        tap((data)=>   this.projId = +data.id),
        tap(()=>this.project = this.user.projects.find((project)=>project.id === this.projId)),
        
      ).subscribe(
        (s)=>this.renderService.renderLoadingWindow = false);
        (er)=>{alert('произошла ошибка авторизации, вы будете переадресованы '); this.router.navigate(['auth'])}; 
  }

}
