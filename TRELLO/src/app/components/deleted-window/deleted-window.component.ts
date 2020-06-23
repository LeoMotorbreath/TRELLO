import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deleted-window',
  templateUrl: './deleted-window.component.html',
  styleUrls: ['./deleted-window.component.css']
})
export class DeletedWindowComponent implements OnInit {

   @Output() deletedWindow = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }
  onDelete(){
    this.deletedWindow.emit(1)
  }
  onReject(){
    this.deletedWindow.emit(0)
  }
}
