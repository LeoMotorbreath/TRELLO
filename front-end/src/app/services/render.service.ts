import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  renderNavBar: boolean = false;
  renderTaskForm:boolean = false;
  renderProjectForm: boolean = false;
  renderLoadingWindow: boolean = false;
  fatalError: boolean = false;
  renderArr = [
    this.renderNavBar,
    this.renderTaskForm,
    this.renderProjectForm,
    this.renderLoadingWindow,
    this.fatalError
  ]
  constructor() { }
}
