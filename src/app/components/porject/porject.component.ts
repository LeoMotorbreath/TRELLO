import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { IProject, Project } from 'src/classes/project';
import { IUser, User } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { tap, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { LoadService } from 'src/app/services/load.service';
import { of, iif } from 'rxjs';
import { RenderService } from 'src/app/services/render.service';
import { ProjectInvite, IInvite } from 'src/classes/invite';
import { TaskList, ITaskList } from 'src/classes/task-list';
import { Task } from 'src/classes/task';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { Model } from 'src/classes/model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskComment } from 'src/classes/comment';


@Component({
  selector: 'app-porject',
  templateUrl: './porject.component.html',
  styleUrls: ['./porject.component.css']
})
export class PorjectComponent implements OnInit {
  constructor(
    private auth            : AuthService,
    private router          : Router,
    private activatedRoute  : ActivatedRoute,
    private data            : UserDataService,
    private load            : LoadService,
    public renderService    : RenderService,
    private dataService     : UserDataService,
    private objectManager   : ObjectManagerService
    ){ }
    ngOnInit(): void {
      this.renderService.renderNavBar = true;
      this.user = this.auth.currentUser;
        this.load.check(this.user).pipe (
          tap((data)=> {if(!this.user){this.user = data}}),
          switchMap(()=> this.activatedRoute.params),
          tap((data)=> this.projId = data.id),
          tap((data)=>console.log(this.user.projects)),
          tap(()=> this.proj = this.user.projects.find(project=>project.id === +this.projId)),
          tap(()=> this.taskLists = this.proj.getTaskLists()),
          ).subscribe();
      
      
      }
      me: string;
  user: User;
  projId: number;
  proj: Project;
  invaitedId: number;
  text:string;
  taskLists: TaskList[];
  creatingInvite: boolean  = false;
  invalidInvite: boolean   = false;
  creatingComment: boolean = false;

  onInvite(data){
  data.pipe(
    tap((data)=>console.log(data)),
      catchError((error)=> of(false)),
      tap((data)=>{
        if(!data){
          this.invalidInvite = true
        }else{
          console.log(data)
          this.proj.invited = (data as Model[])
        }
       
      })
      
    ).subscribe();
  }
  onComment(comment:TaskComment[]){
    console.log(comment)
  }
  kostil() {
    return true 
  }
  setTaskList(taskList){
    
    this.proj.taskLists[0].tasks = taskList
  }
  navigateToTask(taskId){
    this.router.navigate(['task',taskId])
  }
  navigateBack(){
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
  rednerTaskForm() {
    this.renderService.renderTaskForm = true;
  }
  dropEvent(event: CdkDragDrop<Task>){
    console.log(event)
  }
 
  private taskListIndex(taskList){
      return this.proj.taskLists.findIndex(tl=>tl== taskList);
    }
    validateBackArrow(taskList:TaskList){
      return this.taskListIndex(taskList) > 0;
    }
    validateForwardArrow(project:Project,taskList:TaskList){
      return this.taskListIndex(taskList) + 1 < project.taskLists.length;
    }
    transferTask(task:Task,oldTaskList:TaskList,newTaskList:TaskList) {
      let result = this.user.transferTaskToAntoherTaskList(this.proj,task,this.taskListIndex(oldTaskList),this.taskListIndex(newTaskList));
      this.dataService.transferTask(+this.projId,result.oldTaskList,result.newTaskList,).pipe(
        tap(data=>console.log(data)),
      ).subscribe();
    }
  toggleInputLine() {
    this.invaitedId      = null;
    this.invalidInvite   = false;
    this.creatingInvite  = !this.creatingInvite;
  }
  takeTask(task:Task) {
    if(!this.user.tasks.some(tsk=>tsk.id == task.id)){
      let taskToSend = this.objectManager.getDataToShare(task);
      let userModel = new Model(this.user.id,this.user.name);
      this.dataService.takeTask(taskToSend,userModel).pipe(
        tap((data)=>this.user.tasks = (data as ITaskList).tasks.map(el=>el = this.objectManager.updateObjectData(el,new Task()))),
        tap(()=>this.user.tasks.push()),
        tap((data)=>console.log(this.user.tasks))
      ).subscribe();
    }else{
      console.log('123321')
    }
  }
  deleteTask(task:Task,taskList?){
    this.dataService.deleteTask(task.id).pipe(
      catchError((err)=>of(123)),
      tap((data)=>{if(!data){
        // this.user.deleteTask(this.t)
        taskList.tasks.splice(taskList.tasks.findIndex(tk=>tk===task),1);
      }}),
    ).subscribe();
  }
  onModalWindowCanel(){
    this.renderService.renderTaskForm = false
  }
  deleteProject(){
    this.dataService.deleteProject(this.proj).pipe(
      tap((data)=>console.log(data)),
    ).subscribe();
  }
}

