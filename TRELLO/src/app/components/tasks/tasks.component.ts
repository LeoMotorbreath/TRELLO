import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ITask, Task } from 'src/classes/task';
import { IUser, User } from 'src/classes/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadService } from 'src/app/services/load.service';
import { tap } from 'rxjs/operators';
import { RenderService } from 'src/app/services/render.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router : Router,
    private loadService: LoadService,
    private renderSerivce: RenderService
    ){

    }

   user: User;
   allRelatedTasks :ITask[] = [];
   navigateToTask(task:ITask) {
    this.router.navigate(['task',task.id]);
   }

   navigateToTaskProject(task: Task) {
     this.router.navigate(['project',task.projectModel.id])
   }
   
  ngOnInit(): void {
    this.loadService.checkUser(this.user).pipe(
      tap((data)=>this.user = data),
      tap(()=>this.allRelatedTasks = this.user.getUserTasks()),
      tap(()=>this.renderSerivce.renderNavBar = true),
    ).subscribe()
  }
}
