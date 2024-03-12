import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancieroComponent } from './financiero.component';

describe('FinancieroComponent', () => {
  let component: FinancieroComponent;
  let fixture: ComponentFixture<FinancieroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancieroComponent]
    });
    fixture = TestBed.createComponent(FinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
