import { Directive, ElementRef } from '@angular/core';
import { ClickableElementsManagerService } from '../services/clickable-elements-manager.service';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[appDisabled]'
})
export class MyDissabledDirective {
  emitter = this.clickService.emitter;
  sub = this.emitter.pipe(
    tap((data)=>this.elementRef.nativeElement.disabled = data)
  ).subscribe();
  constructor(
    private clickService: ClickableElementsManagerService,
    private elementRef: ElementRef,
    ) { }
  
}
