import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/classes/task';
import { Comment_ } from 'src/classes/comment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  createTask(task){
    return this.http.post('http://localhost:3000/api/create/task', {task})
  }
  takeTask(id) {
    return this.http.patch('http://localhost:3000/api/transfer/takeTask/'+id,null) 
  }
  deleteTask(projectId,taskId){
    return this.http.delete('http://localhost:3000/api/delete/project/' + projectId +'/task/'+taskId);
  }
  moveTask(data){
    return this.http.patch('http://localhost:3000/api/transfer/task',data)
  }
  deleteComment(task:Task,comment:Comment_){
    return this.http.delete('http://localhost:3000/api/delete/task/' + task.id+'/comment/'+ comment.id)
  }
  constructor(private http: HttpClient) { }
}
  