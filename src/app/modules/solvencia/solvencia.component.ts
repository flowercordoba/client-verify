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
  endeudamientoPatrimonio: number = 0;

  
  constructor(private fb: FormBuilder) {
    this.solvenciaForm = this.fb.group({
      nombreEmpresa: [null, Validators.required],
      nitEmpresa: [null, Validators.required],
      totalPasivo: [null, [Validators.required, Validators.min(0.01)]], // Asegúrate de que no sea nulo ni cero
      totalActivo: [null, Validators.required],
      pasivoCorriente: [null, Validators.required],
      pasivoTotal: [null, Validators.required],
      ventasNetas: [null, Validators.required],
      patrimonio: [null, Validators.required]

    });
  }

  ngOnInit(): void {
    this.solvenciaForm.valueChanges.subscribe(() => {
      // Comprobamos que el formulario es válido y que todos los campos requeridos tienen un valor.
      if (this.solvenciaForm.valid && this.checkFormValues(this.solvenciaForm.value)) {
        this.actualizarGrafico();
      }
    });
  }
  
  // Método para comprobar que todos los valores son mayores que cero
  checkFormValues(values: any): boolean {
    for (let key in values) {
      if (values[key] <= 0) {
        return false;
      }
    }
    return true;
  }
  


  actualizarGrafico(): void {
    const valoresFormulario = this.solvenciaForm.value;
  
    // Desestructuración de valores
    const { totalPasivo, totalActivo, pasivoCorriente, pasivoTotal, ventasNetas, patrimonio } = valoresFormulario;
  
    // Cálculos
    this.nivelEndeudamiento = Number((totalPasivo / totalActivo).toFixed(2));
    this.concentracionEndeudamientoCortoPlazo = Number((pasivoCorriente / pasivoTotal).toFixed(2));
    this.endeudamientoVentas = Number((pasivoTotal / ventasNetas).toFixed(2));
    this.multiplicadorCapital = Number((totalActivo / patrimonio).toFixed(2));

    this.endeudamientoPatrimonio = Number(((totalPasivo / patrimonio) * 100).toFixed(2));


    

  
    // Series para el chart
    const seriesChart = [
      {
        name: 'Nivel de Endeudamiento',
        data: [this.nivelEndeudamiento]
      },
      {
        name: 'Concentración Endeudamiento Corto Plazo',
        data: [this.concentracionEndeudamientoCortoPlazo]
      }
    ];
  
    // Series para el chart2
    const seriesChart2 = [
      {
        name: 'Endeudamiento sobre Ventas',
        data: [this.endeudamientoVentas]
      },
      {
        name: 'Multiplicador de Capital',
        data: [this.multiplicadorCapital]
      }
    ];
  
    // Opciones para el chart
    const optionsChart = {
      chart: {
        type: 'bar',
        height: 350
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
      series: seriesChart,
      xaxis: {
        categories: ['Indicadores Financieros']
      }
    };
  
    // Opciones para el chart2
    const optionsChart2 = {
      chart: {
        type: 'bar',
        height: 350
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
      series: seriesChart2,
      xaxis: {
        categories: ['Indicadores Financieros']
      }
    };
  
    // Renderiza o actualiza el chart
    if (this.chart) {
      this.chart.updateOptions(optionsChart);
    } else {
      this.chart = new ApexCharts(document.querySelector("#chart"), optionsChart);
      this.chart.render();
    }
  
    // Renderiza o actualiza el chart2
    if (this.chart2) {
      this.chart2.updateOptions(optionsChart2);
    } else {
      this.chart2 = new ApexCharts(document.querySelector("#chart2"), optionsChart2);
      this.chart2.render();
    }
  }
  


  // exportToPDF(): void {
  //   Promise.all([
  //     this.chart?.dataURI(),
  //     this.chart2?.dataURI()
  //   ]).then((dataURIs) => {
  //     const pdf = new jsPDF();
  //     pdf.setFontSize(16);
  //     pdf.text('Reporte de Solvencia', 20, 20);

  //         // Acceder a los valores del formulario
  //         const nombreEmpresa = this.solvenciaForm.get('nombreEmpresa')?.value || 'N/A';
  //         const nitEmpresa = this.solvenciaForm.get('nitEmpresa')?.value || 'N/A';
      

  //     pdf.text(`Nombre de la Empresa: ${nombreEmpresa}`, 20, 25);
  //     pdf.text(`NIT de la Empresa: ${nitEmpresa}`, 20, 30);
  //    //  pdf.addImage(firstChartURI.imgURI, 'PNG', 15, 40, 180, 80); // Ajustar la posición Y según sea necesario


  
  //     // Asegurarse de que dataURIs[0] tiene imgURI
  //     const firstChart = dataURIs[0] as { imgURI?: string; blob?: Blob };
  //     if (firstChart.imgURI) {
  //       pdf.addImage(firstChart.imgURI, 'PNG', 15, 40, 180, 80); // Ajustado para dejar espacio al texto
  //     }

  
  //     // Asegurarse de que dataURIs[1] tiene imgURI
  //     const secondChart = dataURIs[1] as { imgURI?: string; blob?: Blob };
  //     if (secondChart.imgURI) {
  //       pdf.addPage();
  //       pdf.addImage(secondChart.imgURI, 'PNG', 15, 40, 180, 80); // Ajustado para dejar espacio al texto
  //     }
  
  //     // Añadir los resultados de los cálculos al PDF
  //     pdf.setFontSize(12);
  //     pdf.text(`Nivel endeudamientoPatrimonio: ${this.endeudamientoPatrimonio.toFixed(2)}`, 20, 135);
  //     pdf.text(`Concentración de Endeudamiento Corto Plazo: ${this.concentracionEndeudamientoCortoPlazo.toFixed(2)}`, 20, 145);
  //     pdf.text(`Endeudamiento sobre Ventas: ${this.endeudamientoVentas.toFixed(2)}`, 20, 155);
  //     pdf.text(`Multiplicador de Capital: ${this.multiplicadorCapital.toFixed(2)}`, 20, 165);
  
  //     pdf.save('reporte-solvencia.pdf');
  //   }).catch(error => console.error("Error al exportar los gráficos a PDF", error));
  // }

  exportToPDF(): void {
    Promise.all([
      this.chart?.dataURI(),
      this.chart2?.dataURI()
    ]).then((dataURIs) => {
      const pdf = new jsPDF();
  
      // Define el encabezado y el pie de página
      const addHeader = (pageNumber: number) => {
        pdf.setFillColor(100, 100, 240); // Color de fondo
        pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 20, 'F');
        pdf.setTextColor(255, 255, 255); // Color de texto
        pdf.setFontSize(10);
        pdf.text(`Nombre de la empresa: ${this.solvenciaForm.get('nombreEmpresa')?.value || 'N/A'}`, 20, 10);
        pdf.text(`NIT de la empresa: ${this.solvenciaForm.get('nitEmpresa')?.value || 'N/A'}`, 20, 15);
        pdf.text(`Página ${pageNumber}`, pdf.internal.pageSize.getWidth() - 40, 15);
      };
  
      const addFooter = (pageNumber: number) => {
        const fechaCreacionPDF = new Date().toLocaleDateString();
        pdf.setFillColor(100, 100, 240); // Color de fondo
        pdf.rect(0, pdf.internal.pageSize.getHeight() - 20, pdf.internal.pageSize.getWidth(), 20, 'F');
        pdf.setTextColor(255, 255, 255); // Color de texto
        pdf.setFontSize(10);
        pdf.text(`Fecha de creación del PDF: ${fechaCreacionPDF}`, 20, pdf.internal.pageSize.getHeight() - 5);
      };
  
      let pageNumber = 1;
      addHeader(pageNumber);
      addFooter(pageNumber);
  
      pdf.setFontSize(16);
      pdf.setTextColor(0);
      pdf.text('Reporte de Solvencia', 20, 30);
  
      const firstChart = dataURIs[0] as { imgURI?: string; blob?: Blob };
      if (firstChart?.imgURI) {
        pdf.addImage(firstChart.imgURI, 'PNG', 15, 40, 180, 80); // Ajustado para dejar espacio al texto
      }
  
      const secondChart = dataURIs[1] as { imgURI?: string; blob?: Blob };
      if (secondChart?.imgURI) {
        pageNumber += 1;
        pdf.addPage();
        addHeader(pageNumber);
        addFooter(pageNumber);
        pdf.addImage(secondChart.imgURI, 'PNG', 15, 40, 180, 80); // Ajustado para dejar espacio al texto
      }
  
      // Añadir los resultados de los cálculos al PDF en la página correcta
      pdf.setFontSize(12);
      pdf.text(`Nivel de endeudamiento Patrimonio: ${this.endeudamientoPatrimonio.toFixed(2)}`, 20, 135);
      pdf.text(`Concentración de Endeudamiento Corto Plazo: ${this.concentracionEndeudamientoCortoPlazo.toFixed(2)}`, 20, 145);
      pdf.text(`Endeudamiento sobre Ventas: ${this.endeudamientoVentas.toFixed(2)}`, 20, 155);
      pdf.text(`Multiplicador de Capital: ${this.multiplicadorCapital.toFixed(2)}`, 20, 165);
  
      pdf.save('reporte-solvencia.pdf');
    }).catch(error => console.error("Error al exportar los gráficos a PDF", error));
  }
  

}
