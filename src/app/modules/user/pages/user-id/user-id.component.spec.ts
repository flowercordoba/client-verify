import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdComponent } from './user-id.component';

describe('UserIdComponent', () => {
  let component: UserIdComponent;
  let fixture: ComponentFixture<UserIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserIdComponent]
    });
    fixture = TestBed.createComponent(UserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
