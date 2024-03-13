import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RPaisComponent } from './r-pais.component';

describe('RPaisComponent', () => {
  let component: RPaisComponent;
  let fixture: ComponentFixture<RPaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RPaisComponent]
    });
    fixture = TestBed.createComponent(RPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
