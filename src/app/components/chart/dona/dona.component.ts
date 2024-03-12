import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.scss']
})
export class DonaComponent implements AfterViewInit {
  @ViewChild('donutChart') donutChart!: ElementRef; 

  constructor() { }

  ngAfterViewInit() {
    const options = {
      series: [44, 55, 41, 17, 15],
      chart: {
        type: 'donut',
        height: '100%', // Asegúrate de que el gráfico ocupe todo el contenedor
      },
      title: {
        text: 'Distribución de Reportes', // El texto del título
        align: 'center', // Alineación del título
        margin: 20, // Margen entre el título y el gráfico
        style: {
          fontSize: '16px', // Tamaño del texto
          color: '#263238' // Color del texto
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%', // Hace que el gráfico sea responsivo dentro del contenedor
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      // Aquí puedes ajustar otras opciones según sea necesario
    };
  
    const chart = new ApexCharts(this.donutChart.nativeElement, options);
    chart.render();
  }
  

}
