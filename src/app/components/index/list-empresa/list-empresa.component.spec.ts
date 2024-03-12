import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmpresaComponent } from './list-empresa.component';

describe('ListEmpresaComponent', () => {
  let component: ListEmpresaComponent;
  let fixture: ComponentFixture<ListEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEmpresaComponent]
    });
    fixture = TestBed.createComponent(ListEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
