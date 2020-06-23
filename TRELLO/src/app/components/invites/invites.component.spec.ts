export class Drc{
    emitter = myService.emmiter;
    listener = myService.pipe(
      tap((data)=>this.elementRef.style.disabled = !!data)
    ).subscribe()
    constructor(
    private elementRef: ElementRef,
    private myService: myService,

    ){

  }
}