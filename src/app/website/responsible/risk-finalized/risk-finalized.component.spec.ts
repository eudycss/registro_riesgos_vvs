import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskFinalizedComponent } from './risk-finalized.component';

describe('RiskFinalizedComponent', () => {
  let component: RiskFinalizedComponent;
  let fixture: ComponentFixture<RiskFinalizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskFinalizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskFinalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
