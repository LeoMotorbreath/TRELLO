import { Injectable } from '@angular/core';
import { User, IUser } from 'src/classes/User';
import { Project } from 'src/classes/project';
import { Task } from 'src/classes/task';
import { TaskList } from 'src/classes/task-list';

@Injectable({
  providedIn: 'root'
})
export class ObjectManagerService {

  getDataToShare(object ) {
    let data = {};
    for(let param in object) {
      if(typeof object[param] !== 'function') {
        data[param] = object[param];
      }
    }
    return data 
  }
  
  updateObjectData(obj: object, objToReturn: Object): any {
    for(let key in obj) {
        objToReturn[key] = obj[key];
    }
    return objToReturn;
  }
  
  processProjects(projects:any[]){
    return projects.map((el)=>el = this.updateObjectData(el,new Project()));
  }
  processTaskLists(projects: any[]){
    return projects.map(project=>project.taskLists.map(el=>el = this.updateObjectData(el,new TaskList())))
  }
  processTasks(projects:Project[]){
    for(let i = 0; i<projects.length; i++){ 
      for(let h = 0; h< projects[i].taskLists.length; h++){
        for(let n = 0; n< projects[i].taskLists[h].tasks.length; n++){
          projects[i].taskLists[h].tasks[n] = this.updateObjectData(projects[i].taskLists[h].tasks[n], new Task())
        }
      }
    }
  }
  processEnitys(projects:any[]): Project[]{
    for(let i = 0; i<projects.length; i++){
      projects[i] = this.updateObjectData(projects[i],new Project);
      for(let h = 0; h< projects[i].taskLists.length; h++){
        projects[i].taskLists[h] = this.updateObjectData(projects[i].taskLists[h], new TaskList())
        for(let n = 0; n< projects[i].taskLists[h].tasks.length; n++){
          projects[i].taskLists[h].tasks[n] = this.updateObjectData(projects[i].taskLists[h].tasks[n], new Task())
        }
      }
    }
    return projects
  }
  constructor() { }
}
