import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToggleMenuComponent } from './button-toggle-menu.component';

describe('ButtonToggleMenuComponent', () => {
  let component: ButtonToggleMenuComponent;
  let fixture: ComponentFixture<ButtonToggleMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonToggleMenuComponent]
    });
    fixture = TestBed.createComponent(ButtonToggleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
