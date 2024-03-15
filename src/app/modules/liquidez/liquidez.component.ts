import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import ApexCharts from 'apexcharts';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-liquidez',
  templateUrl: './liquidez.component.html',
  styleUrls: ['./liquidez.component.scss']
})
export class LiquidezComponent  {

  // recuerda el spinner de cargando! 
  liquidezForm: FormGroup;
  chart: ApexCharts | null = null;
  chart2: ApexCharts | null = null; // Segunda gráfica

  capitalDeTrabajo: number = 0;
  razonCorriente: number = 0;
  pruebaAcida: number = 0;
  constructor(private fb: FormBuilder) {
    this.liquidezForm = this.fb.group({
      activoCorriente: [null, Validators.required],
      pasivoCorriente: [null, Validators.required],
      disponible: [null, Validators.required],
      inversionesTemporales: [null, Validators.required],
      deudores: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.liquidezForm.valueChanges.subscribe(() => {
      if (this.liquidezForm.valid) {
        this.actualizarGrafico();
      }
    });
  }

  actualizarGrafico(): void {
    const { activoCorriente,capitalDeTrabajo, pasivoCorriente, disponible, inversionesTemporales, deudores } = this.liquidezForm.value;
  
    // Cálculos de liquidez
    this.capitalDeTrabajo = activoCorriente - pasivoCorriente;
    this.razonCorriente = activoCorriente / pasivoCorriente;
    this.pruebaAcida = (disponible + inversionesTemporales + deudores) / pasivoCorriente;

    // Series para la primera gráfica (Barras)
    const seriesBarras = [
      {
        name: 'Capital de Trabajo',
        data: [this.capitalDeTrabajo]
      },
      {
        name: 'Pasivo Corriente',
        data: [pasivoCorriente]
      }
    ];
  
    const seriesLineas = [
      {
        name: 'Razón Corriente',
        data: [this.razonCorriente]
      },
      {
        name: 'Prueba Ácida',
        data: [this.pruebaAcida]
      }
    ];
  
    const optionsBarras = {
      series: seriesBarras,
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: ['2024']
      },
      title: {
        text: 'Capital de Trabajo y Pasivo Corriente',
        align: 'left', 
        style: {
          fontSize: '10px',
          fontWeight: 'bold',
          color: '#263238'
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
    };
  
    const optionsLineas = {
      series: seriesLineas,
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: ['2024']
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value.toFixed(2); // Redondea el valor a 2 decimales
          }
        }
      },
      
      title: {
        text: 'Razón Corriente & Prueba Ácida', 
        align: 'left', 
        style: {
          fontSize: '10px',
          fontWeight: 'bold',
          color: '#263238'
        }
      },
      stroke: {
        curve: 'straight',
        width: 3
      },
      markers: {
        size: 4
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (value) {
            return value.toFixed(2); // Redondea el valor a 2 decimales en el tooltip
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  
    if (this.chart) {
      this.chart.updateOptions(optionsBarras);
    } else {
      this.chart = new ApexCharts(document.querySelector("#chart"), optionsBarras);
      this.chart.render();
    }
  
    // Crear o actualizar la segunda gráfica (Líneas)
    if (this.chart2) {
      this.chart2.updateOptions(optionsLineas);
    } else {
      this.chart2 = new ApexCharts(document.querySelector("#chart2"), optionsLineas);
      this.chart2.render();
    }
  }
  

  exportToPDF() {
    this.chart.dataURI().then((data: { imgURI?: string, blob?: Blob }) => {
      if (data.imgURI) {
        const pdf = new jsPDF();
        // Título de la gráfica
        pdf.setFontSize(16);
        pdf.text('Grafica', 20, 20);
        // Añade la gráfica al PDF
        pdf.addImage(data.imgURI, 'PNG', 15, 20, 180, 150);

        // pdf.addImage(data.imgURI, 'PNG', 10, 30, 180, 100); // Ajusta según necesidades
        pdf.save('dashed-line-chart.pdf');
      } else {
        console.error("No se pudo obtener la URI de la imagen de la gráfica.");
      }
    }).catch(error => console.error("Error al exportar la gráfica a PDF", error));
  }
 
}
