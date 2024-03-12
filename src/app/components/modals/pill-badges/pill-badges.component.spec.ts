import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillBadgesComponent } from './pill-badges.component';

describe('PillBadgesComponent', () => {
  let component: PillBadgesComponent;
  let fixture: ComponentFixture<PillBadgesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PillBadgesComponent]
    });
    fixture = TestBed.createComponent(PillBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
