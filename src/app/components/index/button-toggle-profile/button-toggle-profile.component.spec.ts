import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToggleProfileComponent } from './button-toggle-profile.component';

describe('ButtonToggleProfileComponent', () => {
  let component: ButtonToggleProfileComponent;
  let fixture: ComponentFixture<ButtonToggleProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonToggleProfileComponent]
    });
    fixture = TestBed.createComponent(ButtonToggleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
