import { Injectable } from '@angular/core';
import { Path } from 'src/classes/path';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  paths = [
    new Path('projects'),
    new Path('tasks'),
    new Path('user'), 
  ]
  
  toggleActive(pathName?:string){
    this.paths.forEach(path=>path.active = false);
    if(pathName){
      let path = this.paths.find(path=>path.name  === pathName) 
      path.active = true;
    }
  }
  constructor() { }
}
