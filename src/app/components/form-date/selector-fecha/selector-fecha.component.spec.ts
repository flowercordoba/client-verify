import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorFechaComponent } from './selector-fecha.component';

describe('SelectorFechaComponent', () => {
  let component: SelectorFechaComponent;
  let fixture: ComponentFixture<SelectorFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorFechaComponent]
    });
    fixture = TestBed.createComponent(SelectorFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
