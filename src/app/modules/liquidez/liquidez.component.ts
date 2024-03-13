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


  constructor(private fb: FormBuilder) {
    this.liquidezForm = this.fb.group({
      activoCorriente: [null, Validators.required],
      pasivoCorriente: [null, Validators.required],
      disponible: [null, Validators.required], // Asumiendo que esto representa el efectivo disponible
      inversionesTemporales: [null, Validators.required], // Asumiendo inversiones que pueden ser fácilmente convertidas en efectivo
      deudores: [null, Validators.required], // Asumiendo esto como cuentas por cobrar
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
    const { activoCorriente, pasivoCorriente, disponible, inversionesTemporales, deudores } = this.liquidezForm.value;

    // Cálculos de liquidez
    const capitalDeTrabajo = activoCorriente - pasivoCorriente;
    const razonCorriente = activoCorriente / pasivoCorriente;
    const pruebaAcida = (disponible + inversionesTemporales + deudores) / pasivoCorriente;
    

    const series= [
      {
        name: 'Capital de Trabajo',
        data: this.calcularProyeccion(capitalDeTrabajo, 5, 0.05)
      },
      {
        name: 'Razón Corriente',
        data: this.calcularProyeccion(razonCorriente, 5, 0.05)
      },
      {
        name: 'Prueba Ácida',
        data: this.calcularProyeccion(pruebaAcida, 5, 0.05)
      },
      {
        name: 'Pasivo Corriente',
        data: [pasivoCorriente] 
      }
    ];
    

    const options = {
      series: series,
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: ['2024', '2025', '2026', '2027', '2028'] 
      },
      title: {
        text: 'RAZON CORRIENTE & PRUEBA ACIDA', 
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
            columnWidth: '45%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: false,
        width: 2,
        colors: ['transparent']
    },
        };


        const options2 = {
          series: series,
          chart: {
            type: 'bar',
            height: 350
          },
          xaxis: {
            categories: ['2024', '2025', '2026', '2027', '2028'] 
          },
          title: {
            text: 'DISTRIBUCIÓN DEL ACTIVO CORRIENTE', 
            align: 'left', 
            style: {
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#263238'
            }
        },
          stroke: {
            curve: 'straight'
          },
          markers: {
            size: 4
          },
          tooltip: {
            shared: true,
            intersect: false
          },
          legend: {
            position: 'botton',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        };
    
        if (this.chart2) {
          this.chart2.updateOptions(options2);
        } else {
          this.chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
          this.chart2.render();
        }



  // Para la primera gráfica (Gráfica de barras)
if (this.chart) {
  this.chart.updateOptions(options);
} else {
  this.chart = new ApexCharts(document.querySelector("#chart"), options);
  this.chart.render();
}



  }

  calcularProyeccion(valorInicial: number, anos: number, tasaIncremento: number): number[] {
    let valorActual = valorInicial;
    const proyeccion = [valorActual]; // Incluye el valor inicial en la proyección

    for (let i = 1; i < anos; i++) { // Comienza en 1 porque ya incluimos el año inicial
      valorActual *= (1 + tasaIncremento); // Incremento del 5% anual
      proyeccion.push(valorActual);
    }
    return proyeccion;
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
