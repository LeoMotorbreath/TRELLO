import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { IUser } from 'src/classes/User';
import { Observable } from 'rxjs';
import { IProject, Project } from 'src/classes/project';
import { ObjectManagerService } from './object-manager.service';
import { ITask, Task } from 'src/classes/task';
import { ITaskList } from 'src/classes/task-list';
import { IInvite } from 'src/classes/invite';
import { IComment, Comment_} from 'src/classes/comment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  
  getUser(): Observable<object> {
    return this.http.get('http://localhost:3000/user')
  }
  
  
  deleteComment(task:Task,comment:Comment_){
    return this.http.delete('http://localhost:3000/api/delete/task/' + task.id+'/comment/'+ comment.id)
  }
  
  сreateComment(comment){
    return this.http.post('http://localhost:3000/api/create/comment',{comment})
  }
  
  
  transferTask(projectId:number, firstTaskListObject,secondTaskListObject) {
    return this.http.post('http://localhost:3000/transferTask',{firstTaskListObject,secondTaskListObject,projectId});
  }
  deleteTask(taskId:number){
    return this.http.delete('http://localhost:3000/task/'+taskId)
  }  
  
  
  constructor(private http: HttpClient,private auth: AuthService, private objManager: ObjectManagerService) { }
}
