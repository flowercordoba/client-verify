import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesLightenComponent } from './badges-lighten.component';

describe('BadgesLightenComponent', () => {
  let component: BadgesLightenComponent;
  let fixture: ComponentFixture<BadgesLightenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgesLightenComponent]
    });
    fixture = TestBed.createComponent(BadgesLightenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
