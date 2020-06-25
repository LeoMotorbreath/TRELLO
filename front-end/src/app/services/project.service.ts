import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/classes/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  deleteProject(project: Project){
    return this.http.delete('http://localhost:3000/api/delete/project/'+project.id);
  }
  postProject(project: Project){
    return this.http.post('http://localhost:3000/api/create/project',{project})
  }
  createInvite(invite){
    return this.http.post('http://localhost:3000/api/create/invite',{invite})
  }
  constructor(private http: HttpClient) { }
}
