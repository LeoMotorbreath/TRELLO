import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  test(email,password) {  
    return this.http.post('http://localhost:3000/api/register',{email,password});
  }
  testLogin(email,password) {
    return this.http.post('http://localhost:3000/api/auth/login', {email,password});
  }
  testGetUser() {
    
    return this.http.get('http://localhost:3000/api/auth/user')
  }
  testCreateProject(project){
    return this.http.post('http://localhost:3000/api/create/project',{project})
  }
  testCreateTask(task){
    return this.http.post('http://localhost:3000/api/create/task', {task})
  }
  testGetProjects(){
    return this.http.get('http://localhost:3000/api/get/projects')
  }
  testCreateComment(comment){
    return this.http.post('http://localhost:3000/api/create/comment',{comment})
  }
  testCreateInvite(invite){
    return this.http.post('http://localhost:3000/api/create/invite',{invite})
  }
 
 
  testDeleteTask(projectId,taskId){
    return this.http.delete('http://localhost:3000/api/delete/project/' + projectId +'/task/'+taskId);
  }
  testDeleteProject(projectId){
    return this.http.delete('http://localhost:3000/api/delete/project/'+ projectId)
  }
  constructor(private http: HttpClient) { }
}
