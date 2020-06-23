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
  postProject(project){
    return this.http.post('http://localhost:3000/api/create/project',{project})
  }
  postTaskList(taskList:ITaskList,projectId) {
    return this.http.post('http://localhost:3000/taskList',{
      taskList: this.objManager.getDataToShare(taskList),
      projectId: projectId,
    })
  }
  createTask(task){
    return this.http.post('http://localhost:3000/api/create/task', {task})
  }
  createInvite(invite){
    return this.http.post('http://localhost:3000/api/create/invite',{invite})
  }
  acceptPorjectInvaite(inviteToAccpet) : Observable<object> {
    return this.http.post('http://localhost:3000/acceptProjectInvite', this.objManager.getDataToShare(inviteToAccpet));
  }
  сreateComment(comment){
    return this.http.post('http://localhost:3000/api/create/comment',{comment})
  }
  
  takeTask(id) {
    return this.http.patch('http://localhost:3000/api/transfer/takeTask/'+id,null) 
  }
  transferTask(projectId:number, firstTaskListObject,secondTaskListObject) {
    return this.http.post('http://localhost:3000/transferTask',{firstTaskListObject,secondTaskListObject,projectId});
  }
  deleteTask(taskId:number){
    return this.http.delete('http://localhost:3000/task/'+taskId)
  }  
  deleteComment(task:Task,comment:Comment_){
    return this.http.delete('http://localhost:3000/api/delete/task/' + task.id+'/comment/'+ comment.id)
  }
  deleteProject(project: Project){
    return this.http.delete('http://localhost:3000/project/'+project._id);
  }

  // task/:taskId/commentTask/:commentId
  constructor(private http: HttpClient,private auth: AuthService, private objManager: ObjectManagerService) { }
}
//