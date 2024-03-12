import { Component, Input, OnInit } from '@angular/core';
import { Indicador, IndicadoresService } from 'src/app/shared/services/indicadores.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() miPropiedad!: string; 

  anos: number[] = [2023];
  indicadores!: Indicador[];

  constructor(private indicadoresService: IndicadoresService) {}

  ngOnInit() {
    this.indicadoresService.indicadores.subscribe(indicadores => {
      this.indicadores = indicadores;
    });
  }

  agregarAno(): void {
    const ultimoAno = this.anos[this.anos.length - 1];
    this.anos.push(ultimoAno + 1);
  }

  agregarIndicador(): void {
    const nuevoIndicador: Indicador = { nombre: `Nuevo Indicador`, valores: {} };
    this.indicadoresService.agregarIndicador(nuevoIndicador);
  }
  eliminarIndicador(index: number): void {
    this.indicadoresService.eliminarIndicador(index);
  }

  
  
}
