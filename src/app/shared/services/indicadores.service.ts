import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Indicador {
  nombre: string;
  valores: { [ano: number]: number };
}

@Injectable({ providedIn: 'root' })
export class IndicadoresService {
  private _indicadores = new BehaviorSubject<Indicador[]>([
    { nombre: 'Margen Bruto', valores: {} },
    { nombre: 'Margen Operativo', valores: {} },
    { nombre: 'Margen Neto', valores: {} }
  ]);
  private _indicadoresSubject = new BehaviorSubject<Indicador[]>([]);


  get indicadores() {
    return this._indicadores.asObservable();

  }

  agregarIndicador(nuevoIndicador: Indicador) {
    const indicadoresActuales = this._indicadores.value;
    this._indicadores.next([...indicadoresActuales, nuevoIndicador]);
  }

  eliminarIndicador(index: number): void {
    const indicadoresActuales = this._indicadores.value;
    indicadoresActuales.splice(index, 1);
    this._indicadores.next(indicadoresActuales);
  }

  actualizarIndicadores(indicadores: Indicador[]) {
    this._indicadoresSubject.next(indicadores);
  }
  

}
