import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSupportComponent } from './unit-support.component';

describe('UnitSupportComponent', () => {
  let component: UnitSupportComponent;
  let fixture: ComponentFixture<UnitSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
