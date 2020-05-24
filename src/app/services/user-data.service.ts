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
import { IComment, TaskComment } from 'src/classes/comment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  
  getUser(): Observable<object> {
    return this.http.get('http://localhost:3000/user')
  }
  postProject(proj: IProject): Observable < any> {
    return this.http.post('http://localhost:3000/project',{project: JSON.stringify(this.objManager.getDataToShare(proj)) })
  }
  postTaskList(taskList:ITaskList,projectId) {
    return this.http.post('http://localhost:3000/taskList',{
      taskList: this.objManager.getDataToShare(taskList),
      projectId: projectId,
    })
  }
  postTask(task:ITask):Observable<any>{
    return this.http.post('http://localhost:3000/task',{
      task: this.objManager.getDataToShare(task)
    })
  }
  postInvaiteToProject(invite:IInvite) : Observable<object> { 
    return this.http.post('http://localhost:3000/inviteToProject', {invite: this.objManager.getDataToShare(invite)})
  }
  postInvaiteToTask(invite){
    return this.http.post('http://localhost:3000/inviteToTask', {invite :this.objManager.getDataToShare(invite)})
  }
  acceptPorjectInvaite(inviteToAccpet) : Observable<object> {
    return this.http.post('http://localhost:3000/acceptProjectInvite', this.objManager.getDataToShare(inviteToAccpet));
  }
  commentTask(comment:IComment){
    return this.http.post('http://localhost:3000/commentTask',this.objManager.getDataToShare(comment));
  }
  
  takeTask(task,userModel) {
    return this.http.post('http://localhost:3000/takeTask',{task,userModel}) 
  }
  transferTask(projectId:number, firstTaskListObject,secondTaskListObject) {
    return this.http.post('http://localhost:3000/transferTask',{firstTaskListObject,secondTaskListObject,projectId});
  }
  deleteTask(taskId:number){
    return this.http.delete('http://localhost:3000/task/'+taskId)
  }  
  deleteComment(task:Task,comment:TaskComment){
    return this.http.delete('http://localhost:3000/tsk/' + task.id+'/comment/'+ comment.id)
  }
  deleteProject(project: Project){
    return this.http.delete('http://localhost:3000/project/'+project.id);
  }

  // task/:taskId/commentTask/:commentId
  constructor(private http: HttpClient,private auth: AuthService, private objManager: ObjectManagerService) { }
}
//