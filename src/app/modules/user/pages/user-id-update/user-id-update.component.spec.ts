import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdUpdateComponent } from './user-id-update.component';

describe('UserIdUpdateComponent', () => {
  let component: UserIdUpdateComponent;
  let fixture: ComponentFixture<UserIdUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserIdUpdateComponent]
    });
    fixture = TestBed.createComponent(UserIdUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
