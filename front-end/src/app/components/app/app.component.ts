import { Component } from '@angular/core';
import { RenderService } from 'src/app/services/render.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public renderService:  RenderService,
  ){}
}
