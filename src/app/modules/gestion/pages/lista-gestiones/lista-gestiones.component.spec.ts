import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGestionesComponent } from './lista-gestiones.component';

describe('ListaGestionesComponent', () => {
  let component: ListaGestionesComponent;
  let fixture: ComponentFixture<ListaGestionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaGestionesComponent]
    });
    fixture = TestBed.createComponent(ListaGestionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
