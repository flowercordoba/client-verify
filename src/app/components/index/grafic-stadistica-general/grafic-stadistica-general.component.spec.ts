import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficStadisticaGeneralComponent } from './grafic-stadistica-general.component';

describe('GraficStadisticaGeneralComponent', () => {
  let component: GraficStadisticaGeneralComponent;
  let fixture: ComponentFixture<GraficStadisticaGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficStadisticaGeneralComponent]
    });
    fixture = TestBed.createComponent(GraficStadisticaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
