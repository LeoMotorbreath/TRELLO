import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {  Project } from 'src/classes/project';
import {  User } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { tap, switchMap,  catchError, } from 'rxjs/operators';
import { LoadService } from 'src/app/services/load.service';
import { of,  } from 'rxjs';
import { RenderService } from 'src/app/services/render.service';
import { TaskList} from 'src/classes/task-list';
import { Task } from 'src/classes/task';

import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-porject',
  templateUrl: './porject.component.html',
  styleUrls: ['./porject.component.css']
})
export class PorjectComponent implements OnInit {
  constructor(
    private auth            : AuthService,
    private router          : Router,
    private activatedRoute  : ActivatedRoute,
    private load            : LoadService,
    public  renderService    : RenderService,
    private changeDetector  : ChangeDetectorRef,
    private clickManager    : ClickableElementsManagerService,
    private navbar          : NavbarService,
    private projectService  : ProjectService,
    private taskService     : TaskService,
    ){ }

    user: User;
    projId: number;
    proj: Project;
    invaitedId: number;
    text:string;
    taskLists: TaskList[];
    creatingInvite: boolean  = false;
    invalidInvite: boolean   = false;
    userNotFound: boolean    = false;
    creatingComment: boolean = false;
    inviteData;
    isDeleted: boolean;

    ngOnInit(): void {
      this.renderService.renderNavBar = true;
      this.renderService.renderLoadingWindow = true;
      this.user = this.auth.currentUser;

        this.load.checkUser(this.user).pipe(
          catchError(error=>{return of(false)}),
          tap((data)=>{
           if(data){
            this.auth.setCurrentUser(data); 
            this.user = this.auth.getCurrentUser();
           }else{
             this.router.navigate([''])
           }
          }),
          switchMap(()=> this.activatedRoute.params),
          tap((data)=> this.projId = +data.id),
          tap(()=> this.proj = this.user.projects.find(project=>project.id === this.projId)),
          tap(()=>{
            if(!this.proj){
              alert('произошла ошибка, попробуйте снова!');
              this.navbar.toggleActive('projects')
              this.router.navigate(['projects'])
            }
          }),
          tap(()=>{
            if(this.proj.deleted) {
              this.isDeleted = true;
            }
          }),
          tap(()=> this.taskLists = this.proj.getTaskLists()),
          tap(()=>this.inviteData = {inviter:this.user,inviteTo: this.proj}) ,
          tap(()=>this.renderService.renderLoadingWindow = false),
         ).subscribe(
          );
      }
  onInvite(data){
  if(data){
    this.proj.invited = data
  }else{
    this.invalidInvite = true;
    }
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
  
  private findTaskList(tasks: Task[]) : TaskList{
     let x  = this.proj.taskLists.find(taskList=> (taskList.tasks == tasks))
      return x 
    }
  dropEvent(event: CdkDragDrop<Task[]>,taskList){
    console.log(taskList);
    if(this.clickManager.dissabled){
      return
    }
    this.clickManager.dissable();
      let data  ={
        projectId:          this.proj.id,
        container:          taskList._id,
        prevContainer:      this.findTaskList(event.previousContainer.data)._id,
        prevIndex:          event.previousIndex,
        currentIndex:       event.currentIndex

      }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
      );
      this.onDrop(data).pipe(
          
        ).subscribe(()=>this.clickManager.turnOn())
      }
      private onDrop(data: any){
        
        
        return this.taskService.moveTask(data)
      }
    deleteTask(task,taskList){
      let bool = confirm('вы уверенны что хотите удалить задачу?')
      if(!bool){
        return 
      } 
      this.clickManager.dissable();

      this.taskService.deleteTask(+this.proj.id,+task.id).pipe(
        tap((data)=>{
          if((data as any).message == 1) {
            taskList.tasks = taskList.tasks.filter(el => el!=task)
            this.changeDetector.detectChanges();
          }
        })
      ).subscribe(()=>{
        this.clickManager.turnOn();
      });
    }
  toggleInputLine() {
    this.invaitedId      = null;
    this.invalidInvite   = false;
    this.creatingInvite  = !this.creatingInvite;
  }

    takeTask(task: Task){
      if(this.user.tasks.some(tsk => tsk.id == task.id)){
        alert('вы уже выполняете эту задачу')
        return;
      }
      this.clickManager.dissable();
      this.taskService.takeTask(task.id).pipe(
        tap((Data)=>console.log(Data)),
        tap((data)=>{
          if((data as any).message){
            this.user.tasks.push(task);
          }
        })
      ).subscribe(()=>{
        alert('вы взяли задачу на выполнение')
        this.clickManager.turnOn();
      })

    }
  
  onModalWindowCanel(){
    this.renderService.renderTaskForm = false
  }
  deleteProject(){
    let bool = confirm('вы уверенны что хотите удалить проект?');
      if(!bool){
        return 
      } 
    this.clickManager.dissable();
    this.projectService.deleteProject(this.proj).pipe(
      catchError(err=>of(false)),
      tap(data=>{
        if(!data){
          
        }
      }),
      tap((data)=>{
        if((data as any).message){
          this.user.projects.splice(this.user.projects.findIndex(project=>project.id == this.proj.id));
        this.router.navigate(['projects'])    
      }
    })
    ).subscribe(()=>{
      this.clickManager.turnOn();
    });
  }
  deletedProjectProcessing(data ){
    if(data){
      this.deleteProject();
    }else{
      this.isDeleted = false;
    }
  }
}

