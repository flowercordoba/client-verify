import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighLightedComponent } from './high-lighted.component';

describe('HighLightedComponent', () => {
  let component: HighLightedComponent;
  let fixture: ComponentFixture<HighLightedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighLightedComponent]
    });
    fixture = TestBed.createComponent(HighLightedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
