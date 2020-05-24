import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  renderNavBar: boolean = false;
  renderTaskForm:boolean = false;
  renderProjectFrom: boolean = false;
  renderArr = [
    this.renderNavBar,
    this.renderTaskForm,
    this.renderProjectFrom
  ]
  constructor() { }
}
