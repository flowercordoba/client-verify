import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-solvencia',
  templateUrl: './solvencia.component.html',
  styleUrls: ['./solvencia.component.scss']
})
export class SolvenciaComponent implements OnInit {
  solvenciaForm: FormGroup;
  chart: ApexCharts | null = null;
  chart2: ApexCharts | null = null;

  nivelEndeudamiento: number = 0;
  concentracionEndeudamientoCortoPlazo: number = 0;
  endeudamientoVentas: number = 0;
  multiplicadorCapital: number = 0;

  constructor(private fb: FormBuilder) {
    this.solvenciaForm = this.fb.group({
      totalPasivo: [null, Validators.required],
      totalActivo: [null, Validators.required],
      pasivoCorriente: [null, Validators.required],
      pasivoTotal: [null, Validators.required],
      ventasNetas: [null, Validators.required],
      patrimonio: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.solvenciaForm.valueChanges.subscribe(() => {
      if (this.solvenciaForm.valid) {
        this.actualizarGrafico();
      }
    });
  }

  actualizarGrafico(): void {
    const { totalPasivo, totalActivo, pasivoCorriente, pasivoTotal, ventasNetas, patrimonio } = this.solvenciaForm.value;

    // Conversión de string a número después de toFixed
    this.nivelEndeudamiento = +((totalPasivo / totalActivo).toFixed(2));
    this.concentracionEndeudamientoCortoPlazo = +((pasivoCorriente / pasivoTotal).toFixed(2));
    this.endeudamientoVentas = +((pasivoTotal / ventasNetas).toFixed(2));
    this.multiplicadorCapital = +((totalActivo / patrimonio).toFixed(2));

    // Actualización de los datos para el primer gráfico
    const series1 = [
      {
        name: 'Nivel de Endeudamiento',
        data: [this.nivelEndeudamiento]
      },
      {
        name: 'Concentración Endeudamiento Corto Plazo',
        data: [this.concentracionEndeudamientoCortoPlazo]
      }
    ];

    // Actualización de los datos para el segundo gráfico
    const series2 = [
      {
        name: 'Endeudamiento / Ventas',
        data: [this.endeudamientoVentas]
      },
      {
        name: 'Multiplicador de Capital',
        data: [this.multiplicadorCapital]
      }
    ];

    // Configuraciones del gráfico 1
    const options1 = {
      series: series1,
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Indicadores Financieros']
      }
    };

    // Configuraciones del gráfico 2
    const options2 = {
      series: series2,
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Indicadores Financieros']
      }
    };

    // Renderizar el primer gráfico
    if (this.chart) {
      this.chart.updateOptions(options1);
    } else {
      this.chart = new ApexCharts(document.querySelector("#chart"), options1);
      this.chart.render();
    }

    // Renderizar el segundo gráfico
    if (this.chart2) {
      this.chart2.updateOptions(options2);
    } else {
      this.chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
      this.chart2.render();
    }
  }

  exportToPDF(): void {
    Promise.all([
      this.chart?.dataURI(),
      this.chart2?.dataURI()
    ]).then((dataURIs) => {
      const pdf = new jsPDF();
      pdf.setFontSize(16);
      pdf.text('Reporte de Solvencia', 20, 20);
      
      // Asegurarse de que dataURIs[0] tiene imgURI
      const firstChart = dataURIs[0] as { imgURI?: string; blob?: Blob };
      if (firstChart.imgURI) {
        pdf.addImage(firstChart.imgURI, 'PNG', 15, 25, 180, 80);
      }
  
      // Asegurarse de que dataURIs[1] tiene imgURI
      const secondChart = dataURIs[1] as { imgURI?: string; blob?: Blob };
      if (secondChart.imgURI) {
        pdf.addPage();
        pdf.addImage(secondChart.imgURI, 'PNG', 15, 25, 180, 80);
      }
  
      pdf.save('reporte-solvencia.pdf');
    }).catch(error => console.error("Error al exportar los gráficos a PDF", error));
  }
  
}
