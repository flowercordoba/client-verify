import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaTDatosComponent } from './politica-tdatos.component';

describe('PoliticaTDatosComponent', () => {
  let component: PoliticaTDatosComponent;
  let fixture: ComponentFixture<PoliticaTDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoliticaTDatosComponent]
    });
    fixture = TestBed.createComponent(PoliticaTDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
