import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBalanceGeneralComponent } from './card-balance-general.component';

describe('CardBalanceGeneralComponent', () => {
  let component: CardBalanceGeneralComponent;
  let fixture: ComponentFixture<CardBalanceGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBalanceGeneralComponent]
    });
    fixture = TestBed.createComponent(CardBalanceGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
