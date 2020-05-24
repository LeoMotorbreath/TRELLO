import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { IProject, Project } from 'src/classes/project';
import { ITaskList, TaskList } from 'src/classes/task-list';
import { IUser } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Task } from 'src/classes/task';
import { UserDataService } from 'src/app/services/user-data.service';
import { LoadService } from 'src/app/services/load.service';
import { tap, switchMap } from 'rxjs/operators';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { RenderService } from 'src/app/services/render.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: UserDataService,
    private load: LoadService,
    private objManager: ObjectManagerService,
    private renderService: RenderService,
    private ref: ChangeDetectorRef
    ) { }
    @Output() onCanel = new EventEmitter<boolean>();
    @Output() onTasks = new EventEmitter<any>()
    toggle() {
      this.onCanel.emit(false);
  }
    sendTasksToParentComponent(tasks){
      this.onTasks.emit(tasks);
    }
   
  taskName:string;
  taskText:string;
  currentUser: IUser;
  projId: number;
  currentProject:Project;
  
  createTask(taskName: string,defenition?: string) {
    let taskToPost = this.currentUser.createTask(taskName,this.currentProject,this.currentProject.taskLists[0],defenition);
    this.dataService.postTask(taskToPost).pipe(
      tap((data)=>this.currentProject.taskLists[0].tasks = data.map(el=>el = this.objManager.updateObjectData(el,new Task))),
      // tap(()=>this.router.navigate(['task',this.currentProject.taskLists[0].tasks[this.currentProject.taskLists[0].tasks.length-1].id])),
        // tap(()=>this.router.navigate(['task',this.currentProject.getTaskList(0).tasks[this.currentProject.getTaskList(0).tasks.length-1].id])),
       tap(()=>this.renderService.renderTaskForm = false),
       tap(()=>this.sendTasksToParentComponent(this.currentProject.taskLists[0].tasks))
      ).subscribe();
  }
  
  ngOnInit(){
    this.currentUser = this.auth.currentUser;
    
      this.load.check(this.currentUser).pipe (
        tap((data)=>   this.currentUser = data),
        switchMap(()=> this.activatedRoute.params),
        tap((data)=>   this.projId = data.id),
        tap(()=>       this.currentProject = this.objManager.updateObjectData(this.currentUser.projects.find(project=>project.id === +this.projId),new Project())),
        tap(()=>       this.currentProject.setTaskLists(this.currentProject.getTaskLists().map((taskList)=>taskList = this.objManager.updateObjectData(taskList,new TaskList()))) ),
        
        ).subscribe();
    
    
  }
  goBack(){
    
  
  }
  log(){
    console.log(123)
  }
}
