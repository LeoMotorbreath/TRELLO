import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedWindowComponent } from './deleted-window.component';

describe('DeletedWindowComponent', () => {
  let component: DeletedWindowComponent;
  let fixture: ComponentFixture<DeletedWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
