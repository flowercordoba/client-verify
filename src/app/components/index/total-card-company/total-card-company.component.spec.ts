import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCardCompanyComponent } from './total-card-company.component';

describe('TotalCardCompanyComponent', () => {
  let component: TotalCardCompanyComponent;
  let fixture: ComponentFixture<TotalCardCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalCardCompanyComponent]
    });
    fixture = TestBed.createComponent(TotalCardCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
