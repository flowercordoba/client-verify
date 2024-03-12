import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficIndiceGeneralComponent } from './grafic-indice-general.component';

describe('GraficIndiceGeneralComponent', () => {
  let component: GraficIndiceGeneralComponent;
  let fixture: ComponentFixture<GraficIndiceGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficIndiceGeneralComponent]
    });
    fixture = TestBed.createComponent(GraficIndiceGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
