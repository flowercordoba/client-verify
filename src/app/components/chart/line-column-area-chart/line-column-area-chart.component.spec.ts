import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineColumnAreaChartComponent } from './line-column-area-chart.component';

describe('LineColumnAreaChartComponent', () => {
  let component: LineColumnAreaChartComponent;
  let fixture: ComponentFixture<LineColumnAreaChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineColumnAreaChartComponent]
    });
    fixture = TestBed.createComponent(LineColumnAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
