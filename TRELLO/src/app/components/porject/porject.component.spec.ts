import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorjectComponent } from './porject.component';

describe('PorjectComponent', () => {
  let component: PorjectComponent;
  let fixture: ComponentFixture<PorjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
