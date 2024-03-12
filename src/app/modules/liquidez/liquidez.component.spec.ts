import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidezComponent } from './liquidez.component';

describe('LiquidezComponent', () => {
  let component: LiquidezComponent;
  let fixture: ComponentFixture<LiquidezComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiquidezComponent]
    });
    fixture = TestBed.createComponent(LiquidezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
