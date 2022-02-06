import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAssignComponent } from './to-assign.component';

describe('ToAssignComponent', () => {
  let component: ToAssignComponent;
  let fixture: ComponentFixture<ToAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
