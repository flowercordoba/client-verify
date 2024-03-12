import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplineAreaComponent } from './spline-area.component';

describe('SplineAreaComponent', () => {
  let component: SplineAreaComponent;
  let fixture: ComponentFixture<SplineAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplineAreaComponent]
    });
    fixture = TestBed.createComponent(SplineAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
