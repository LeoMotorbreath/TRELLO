import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RenderService } from 'src/app/services/render.service';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements OnInit {
  closeModal() {
    this.render.renderLoadingWindow = false;
  
  }
  constructor(private render: RenderService) { }

  ngOnInit(): void {
  }
}
