import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskVisualizeComponent } from './risk-visualize.component';

describe('RiskVisualizeComponent', () => {
  let component: RiskVisualizeComponent;
  let fixture: ComponentFixture<RiskVisualizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskVisualizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
