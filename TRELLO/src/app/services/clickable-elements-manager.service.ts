import { Injectable, ElementRef } from '@angular/core';
import { element } from 'protractor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClickableElementsManagerService {
  dissabled: boolean =  false
  emitter = new Subject<boolean>()
  dissable (){
    this.dissabled = true;
    this.emitter.next(this.dissabled);
  }
  turnOn(){
    this.dissabled = false;
    this.emitter.next(this.dissabled)
  }

  
  constructor() { }
}
