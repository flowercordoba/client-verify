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
      totalPasivo: [null, [Validators.required, Validators.min(0.01)]], // Asegúrate de que no sea nulo ni cero
      totalActivo: [null, Validators.required],
      pasivoCorriente: [null, Validators.required],
      pasivoTotal: [null, Validators.required],
      ventasNetas: [null, Validators.required],
      patrimonio: [null, Validators.required]

    });
  }

  // ngOnInit(): void {
  //   this.solvenciaForm.valueChanges.subscribe(() => {
  //     if (this.solvenciaForm.valid) {
  //       this.actualizarGrafico();
  //     }
  //   });
  // }

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
  

  // actualizarGrafico(): void {
  //   const { totalPasivo, totalActivo, pasivoCorriente, pasivoTotal, ventasNetas, patrimonio } = this.solvenciaForm.value;
    
  //   console.log('Valores del formulario:', this.solvenciaForm.value);
  
  //   if (totalPasivo == null || patrimonio == null || totalPasivo === 0 || patrimonio === 0) {
  //     console.error('El total de pasivo o el patrimonio son nulos o cero.');
  //     return; // Salir de la función si los valores no son adecuados para el cálculo
  //   }
  
  //   // Asegúrate de que los valores son números y no cadenas
  //   const totalPasivoNum = Number(totalPasivo);
  //   const patrimonioNum = Number(patrimonio);
  
  //   // Realiza el cálculo del endeudamientoPatrimonio
  //   this.endeudamientoPatrimonio = +(totalPasivoNum / patrimonioNum * 100).toFixed(2);
  
  //   console.log('Endeudamiento sobre Patrimonio calculado:', this.endeudamientoPatrimonio);
  
  // }
  
  // actualizarGrafico(): void {
  //   const { totalPasivo, totalActivo, pasivoCorriente, pasivoTotal, ventasNetas, patrimonio } = this.solvenciaForm.value;

  //   // Conversión de string a número después de toFixed
  //   this.nivelEndeudamiento = +((totalPasivo / totalActivo).toFixed(2));
  //   this.concentracionEndeudamientoCortoPlazo = +((pasivoCorriente / pasivoTotal).toFixed(2));
  //   this.endeudamientoVentas = +((pasivoTotal / ventasNetas).toFixed(2));
  //   this.multiplicadorCapital = +((totalActivo / patrimonio).toFixed(2));
  //   this.endeudamientoPatrimonio = +((totalPasivo / patrimonio) * 100).toFixed(2);


  //   const series1 = [
  //     {
  //       name: 'Nivel de Endeudamiento',
  //       data: [this.nivelEndeudamiento]
  //     },
  //     {
  //       name: 'Concentración Endeudamiento Corto Plazo',
  //       data: [this.concentracionEndeudamientoCortoPlazo]
  //     }
  //   ];

  //   const series2 = [
  //     {
  //       name: 'Endeudamiento / Ventas',
  //       data: [this.endeudamientoVentas]
  //     },
  //     {
  //       name: 'Multiplicador de Capital',
  //       data: [this.multiplicadorCapital]
  //     },
  //     {
  //       name: 'Índice de Endeudamiento sobre Patrimonio',
  //       data: [this.endeudamientoPatrimonio] 
  //     }
  //   ];
  //   // const series3 = [
  //   //   {
  //   //     name: 'Índice de Endeudamiento',
  //   //     data: [this.endeudamientoPatrimonio]
  //   //   }
  //   // ];

  //   // Configuraciones del gráfico 1
  //   const options1 = {
  //     series: series1,
  //     chart: {
  //       type: 'bar',
  //       height: 350
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: '55%',
  //         endingShape: 'rounded'
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     xaxis: {
  //       categories: ['Indicadores Financieros']
  //     }
  //   };

  //   // Configuraciones del gráfico 2
  //   const options2 = {
  //     series: series2,
  //     chart: {
  //       type: 'bar',
  //       height: 350
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: '55%',
  //         endingShape: 'rounded'
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     xaxis: {
  //       categories: ['Indicadores Financieros']
  //     }
  //   };

  //   // Renderizar el primer gráfico
  //   if (this.chart) {
  //     this.chart.updateOptions(options1);
  //   } else {
  //     this.chart = new ApexCharts(document.querySelector("#chart"), options1);
  //     this.chart.render();
  //   }

  //   // Renderizar el segundo gráfico
  //   if (this.chart2) {
  //     this.chart2.updateOptions(options2);
  //   } else {
  //     this.chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
  //     this.chart2.render();
  //   }
  // }

  // actualizarGrafico(): void {
  //   const valoresFormulario = this.solvenciaForm.value;
  
  //   console.log('Valores del formulario:', valoresFormulario);
  
  //   // Asegúrate de que todos los valores necesarios estén presentes y sean mayores a cero
  //   if (!valoresFormulario.totalPasivo || !valoresFormulario.patrimonio || valoresFormulario.totalPasivo <= 0 || valoresFormulario.patrimonio <= 0) {
  //     console.error('El total de pasivo o el patrimonio son nulos, cero o negativos.');
  //     return; // Salir de la función si los valores no son adecuados para el cálculo
  //   }
    
  
  //   // Desestructuración de valores con validación de que son números positivos
  //   const { totalPasivo, totalActivo, pasivoCorriente, pasivoTotal, ventasNetas, patrimonio } = valoresFormulario;
  

    
  //   this.nivelEndeudamiento = Number((totalPasivo / totalActivo).toFixed(2));
  //   this.concentracionEndeudamientoCortoPlazo = Number((pasivoCorriente / pasivoTotal).toFixed(2));
  //   this.endeudamientoVentas = Number((pasivoTotal / ventasNetas).toFixed(2));
  //   this.multiplicadorCapital = Number((totalActivo / patrimonio).toFixed(2));
  //   this.endeudamientoPatrimonio = Number(((totalPasivo / patrimonio) * 100).toFixed(2));

  //   }

  // actualizarGrafico(): void {
  //   const valoresFormulario = this.solvenciaForm.value;
  
  //   // Desestructuración de valores
  //   const { totalPasivo, totalActivo, pasivoCorriente, pasivoTotal, ventasNetas, patrimonio } = valoresFormulario;
  
  //   // Asegúrate de que los valores son números y no cadenas
  //   this.nivelEndeudamiento = Number((totalPasivo / totalActivo).toFixed(2));
  //   this.concentracionEndeudamientoCortoPlazo = Number((pasivoCorriente / pasivoTotal).toFixed(2));
  //   this.endeudamientoVentas = Number((pasivoTotal / ventasNetas).toFixed(2));
  //   this.multiplicadorCapital = Number((totalActivo / patrimonio).toFixed(2));
  //   this.endeudamientoPatrimonio = Number(((totalPasivo / patrimonio) * 100).toFixed(2));
  
  //   // Series y opciones del gráfico de barras
  //   const series = [
  //     {
  //       name: 'Nivel de Endeudamiento',
  //       data: [this.nivelEndeudamiento]
  //     },
  //     {
  //       name: 'Concentración Endeudamiento Corto Plazo',
  //       data: [this.concentracionEndeudamientoCortoPlazo]
  //     },
  //     {
  //       name: 'Endeudamiento sobre Ventas',
  //       data: [this.endeudamientoVentas]
  //     },
  //     {
  //       name: 'Multiplicador de Capital',
  //       data: [this.multiplicadorCapital]
  //     },
  //     {
  //       name: 'Índice de Endeudamiento sobre Patrimonio',
  //       data: [this.endeudamientoPatrimonio]
  //     }
  //   ];
  
  //   const options = {
  //     chart: {
  //       type: 'bar',
  //       height: 350
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: '55%',
  //         endingShape: 'rounded'
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     series: series,
  //     xaxis: {
  //       categories: ['Indicadores Financieros']
  //     }
  //   };
  
  //   // Renderiza o actualiza el gráfico
  //   if (this.chart) {
  //     this.chart.updateOptions({ series });
  //   } else {
  //     this.chart = new ApexCharts(document.querySelector("#chart"), options);
  //     this.chart.render();
  //   }
  
  // }


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
    // console.log("Total Pasivo:", totalPasivo, "Patrimonio:", patrimonio, "Índice de Endeudamiento sobre Patrimonio calculado:", this.endeudamientoPatrimonio);
    // this.debugValoresCalculados();

    

  
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
      
  //     // Asegurarse de que dataURIs[0] tiene imgURI
  //     const firstChart = dataURIs[0] as { imgURI?: string; blob?: Blob };
  //     if (firstChart.imgURI) {
  //       pdf.addImage(firstChart.imgURI, 'PNG', 15, 25, 180, 80);
  //     }
  
  //     // Asegurarse de que dataURIs[1] tiene imgURI
  //     const secondChart = dataURIs[1] as { imgURI?: string; blob?: Blob };
  //     if (secondChart.imgURI) {
  //       pdf.addPage();
  //       pdf.addImage(secondChart.imgURI, 'PNG', 15, 25, 180, 80);
  //     }
  
  //     pdf.save('reporte-solvencia.pdf');
  //   }).catch(error => console.error("Error al exportar los gráficos a PDF", error));
  // }

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
        pdf.addImage(firstChart.imgURI, 'PNG', 15, 40, 180, 80); // Ajustado para dejar espacio al texto
      }
  
      // Asegurarse de que dataURIs[1] tiene imgURI
      const secondChart = dataURIs[1] as { imgURI?: string; blob?: Blob };
      if (secondChart.imgURI) {
        pdf.addPage();
        pdf.addImage(secondChart.imgURI, 'PNG', 15, 40, 180, 80); // Ajustado para dejar espacio al texto
      }
  
      // Añadir los resultados de los cálculos al PDF
      pdf.setFontSize(12);
      pdf.text(`Nivel endeudamientoPatrimonio: ${this.endeudamientoPatrimonio.toFixed(2)}`, 20, 135);
      pdf.text(`Concentración de Endeudamiento Corto Plazo: ${this.concentracionEndeudamientoCortoPlazo.toFixed(2)}`, 20, 145);
      pdf.text(`Endeudamiento sobre Ventas: ${this.endeudamientoVentas.toFixed(2)}`, 20, 155);
      pdf.text(`Multiplicador de Capital: ${this.multiplicadorCapital.toFixed(2)}`, 20, 165);
  
      pdf.save('reporte-solvencia.pdf');
    }).catch(error => console.error("Error al exportar los gráficos a PDF", error));
  }
  
  // debugValoresCalculados(): void {
  //   console.log("Valores del formulario:", this.solvenciaForm.value);
  //   console.log("Nivel de Endeudamiento:", this.nivelEndeudamiento);
  //   console.log("Concentración de Endeudamiento Corto Plazo:", this.concentracionEndeudamientoCortoPlazo);
  //   console.log("Endeudamiento sobre Ventas:", this.endeudamientoVentas);
  //   console.log("Multiplicador de Capital:", this.multiplicadorCapital);
  //   console.log("Índice de Endeudamiento sobre Patrimonio:", this.endeudamientoPatrimonio);


  // }
}
