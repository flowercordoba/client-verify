import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripedHoverableComponent } from './striped-hoverable.component';

describe('StripedHoverableComponent', () => {
  let component: StripedHoverableComponent;
  let fixture: ComponentFixture<StripedHoverableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StripedHoverableComponent]
    });
    fixture = TestBed.createComponent(StripedHoverableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
