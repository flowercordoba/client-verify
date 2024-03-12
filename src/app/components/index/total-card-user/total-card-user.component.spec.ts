import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCardUserComponent } from './total-card-user.component';

describe('TotalCardUserComponent', () => {
  let component: TotalCardUserComponent;
  let fixture: ComponentFixture<TotalCardUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalCardUserComponent]
    });
    fixture = TestBed.createComponent(TotalCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
