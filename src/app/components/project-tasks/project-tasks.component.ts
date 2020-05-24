import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ITaskList } from 'src/classes/task-list';
import { IProject, Project } from 'src/classes/project';

import { ITask } from 'src/classes/task';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskComment } from 'src/classes/comment';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTaskListsComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router,private activatedRoute:ActivatedRoute) { }
    currentProject: Project;
    currentProjectTaskLists: ITaskList[] ;
    user = this.auth.currentUser;
    componentIf = false;
    commentText:string;
    toggleIf(){
     // console.log(this.user.projects[0].taskLists[0].listTasks[0].comments)
     // this.componentIf =!this.componentIf
      
    }
    commentTask(task:ITask,text:string):void{
      task.comments.push(new TaskComment(this.user,task,text))
      console.log(task.comments)
      
      this.commentText = ""
      this.toggleIf();
    }
    answear(){

    }
    log(){
      console.log(this.currentProjectTaskLists)
    }
    goToTaskForm(taskListName){
      this.router.navigate(['taskForm',this.currentProject.name,'projectTaskLists',taskListName])
    }
    subscription$ = this.activatedRoute.params.subscribe(
      params=> {
        this.currentProject = this.user.projects.find(project => project.name === params.name);
        this.currentProjectTaskLists = this.currentProject.getTaskLists();
      }
    )
    goToTasks(){
      this.router.navigate(['tasks']);
    }
  ngOnInit(): void {
    
  }

}
