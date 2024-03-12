import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnLabelsComponent } from './column-labels.component';

describe('ColumnLabelsComponent', () => {
  let component: ColumnLabelsComponent;
  let fixture: ComponentFixture<ColumnLabelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnLabelsComponent]
    });
    fixture = TestBed.createComponent(ColumnLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
