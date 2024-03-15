import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ApexCharts from 'apexcharts';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-rentabilidad',
  templateUrl: './rentabilidad.component.html',
  styleUrls: ['./rentabilidad.component.scss']
})
export class RentabilidadComponent implements OnInit {
  rentabilidadForm: FormGroup;
  chartMargenes: ApexCharts | null = null;
  chartRentabilidad: ApexCharts | null = null;
  
  margenBruto: number = 0;
  margenOperativo: number = 0;
  margenNeto: number = 0;
  rentabilidadPatrimonio: number = 0;
  rentabilidadActivoTotal: number = 0;



  constructor(private fb: FormBuilder) {
    this.rentabilidadForm = this.fb.group({
      utilidadBruta: [null, Validators.required],
      ventasNetas: [null, Validators.required],
      utilidadOperacional: [null, Validators.required],
      utilidadNeta: [null, Validators.required],
      patrimonioLiquido: [null, Validators.required],
      activoTotal: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.rentabilidadForm.valueChanges.subscribe(() => {
      if (this.rentabilidadForm.valid) {
        this.calcularResultados();
        // this.actualizarGrafico();
      }
    });
  }
  calcularResultados(): void {
    const { utilidadBruta, ventasNetas, utilidadOperacional, utilidadNeta, patrimonioLiquido, activoTotal } = this.rentabilidadForm.value;
  

    this.margenBruto = Number((utilidadBruta / ventasNetas).toFixed(2));
    this.margenOperativo = Number((utilidadOperacional / ventasNetas).toFixed(2));
    this.margenNeto = Number((utilidadNeta / ventasNetas).toFixed(2));
    this.rentabilidadPatrimonio = Number((utilidadNeta / patrimonioLiquido).toFixed(2));
    this.rentabilidadActivoTotal = Number((utilidadNeta / activoTotal).toFixed(2));
  }
  

  // actualizarGrafico(): void {
  //   const { utilidadBruta, ventasNetas, utilidadOperacional, utilidadNeta, patrimonioLiquido, activoTotal } = this.rentabilidadForm.value;

  //   const rentabilidadBruta = utilidadBruta / ventasNetas;
  //   const rentabilidadOperacional = utilidadOperacional / ventasNetas;
  //   const rentabilidadNeta = utilidadNeta / ventasNetas;
  //   const rentabilidadPatrimonio = utilidadNeta / patrimonioLiquido;
  //   const rentabilidadActivoTotal = utilidadNeta / activoTotal;

  //   const series = [
  //     {
  //       name: 'Margen Bruto',
  //       data: this.calcularProyeccion(rentabilidadBruta, 5, 0.05)
  //     },
  //     {
  //       name: 'Margen Operativo',
  //       data: this.calcularProyeccion(rentabilidadOperacional, 5, 0.05)
  //     },
  //     {
  //       name: 'Margen Neto',
  //       data: this.calcularProyeccion(rentabilidadNeta, 5, 0.05)
  //     },
  //     {
  //       name: 'Rentabilidad del Patrimonio',
  //       data: this.calcularProyeccion(rentabilidadPatrimonio, 5, 0.05)
  //     },
  //     {
  //       name: 'Rentabilidad del Activo Total',
  //       data: this.calcularProyeccion(rentabilidadActivoTotal, 5, 0.05)
  //     }
  //   ];

  //   const options = {
  //     series: series,
  //     chart: {
  //       type: 'bar',
  //       height: 350
  //     },
  //     xaxis: {
  //       categories: ['2024', '2025', '2026', '2027', '2028'] 
  //     },
  //     title: {
  //       text: 'Análisis de Rentabilidad', 
  //       align: 'left', 
  //       style: {
  //           fontSize: '10px',
  //           fontWeight: 'bold',
  //           color: '#263238'
  //       }
  //   },
  //   plotOptions: {
  //       bar: {
  //           horizontal: false,
  //           columnWidth: '45%',
  //           endingShape: 'rounded'
  //       },
  //   },
  //   dataLabels: {
  //       enabled: false
  //   },
  //   stroke: {
  //       show: false,
  //       width: 2,
  //       colors: ['transparent']
  //   },
  //       };

  //   if (this.chartMargenes) {
  //     this.chartMargenes.updateOptions({ series: series });
  //   } else {
  //     this.chartMargenes = new ApexCharts(document.querySelector("#chart"), options);
  //     this.chartMargenes.render();
  //   }
  // }
  actualizarGrafico(): void {
    // Datos para el gráfico de márgenes
    const seriesMargenes = [
      {
        name: 'Margen Bruto',
        data: [this.margenBruto]
      },
      {
        name: 'Margen Operativo',
        data: [this.margenOperativo]
      },
      {
        name: 'Margen Neto',
        data: [this.margenNeto]
      }
    ];
  
    // Datos para el gráfico de rentabilidad
    const seriesRentabilidad = [
      {
        name: 'Rentabilidad del Patrimonio',
        data: [this.rentabilidadPatrimonio]
      },
      {
        name: 'Rentabilidad del Activo Total',
        data: [this.rentabilidadActivoTotal]
      }
    ];
  
    // Opciones para el gráfico de márgenes
    const optionsMargenes = {
      series: seriesMargenes,
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: ['2024']
      },
      stroke: {
        curve: 'straight'
      }
    };
  
    // Opciones para el gráfico de rentabilidad
    const optionsRentabilidad = {
      series: seriesRentabilidad,
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: ['2024']
      },
      stroke: {
        curve: 'straight'
      }
    };
  
    // Inicializar o actualizar el gráfico de márgenes
    if (this.chartMargenes) {
      this.chartMargenes.updateOptions(optionsMargenes);
    } else {
      this.chartMargenes = new ApexCharts(document.querySelector("#chartMargenes"), optionsMargenes);
      this.chartMargenes.render();
    }
  
    // Inicializar o actualizar el gráfico de rentabilidad
    if (this.chartRentabilidad) {
      this.chartRentabilidad.updateOptions(optionsRentabilidad);
    } else {
      this.chartRentabilidad = new ApexCharts(document.querySelector("#chartRentabilidad"), optionsRentabilidad);
      this.chartRentabilidad.render();
    }
  }
  
  exportToPDF(): void {
    Promise.all([
      this.chartMargenes?.dataURI(),
      this.chartRentabilidad?.dataURI()
    ]).then((dataURIs) => {
      const pdf = new jsPDF();
      pdf.setFontSize(16);
      pdf.text('Reporte de Rentabilidad', 20, 20);
  
      // Añade la primera gráfica al PDF, con aserción de tipo
      const firstChartURI = dataURIs[0] as { imgURI?: string; blob?: Blob };
      if (firstChartURI.imgURI) {
        pdf.addImage(firstChartURI.imgURI, 'PNG', 15, 30, 180, 80);
        pdf.setFontSize(12);
        pdf.text(`Margen Bruto: ${this.margenBruto.toFixed(2)}%`, 20, 115);
        pdf.text(`Margen Operativo: ${this.margenOperativo.toFixed(2)}%`, 20, 125);
        pdf.text(`Margen Neto: ${this.margenNeto.toFixed(2)}%`, 20, 135);
      }
  
      // Añade una nueva página para el segundo gráfico y sus resultados, con aserción de tipo
      const secondChartURI = dataURIs[1] as { imgURI?: string; blob?: Blob };
      if (secondChartURI.imgURI) {
        pdf.addPage();
        pdf.setFontSize(16);
        pdf.text('Continuación Reporte de Rentabilidad', 20, 20);
        pdf.addImage(secondChartURI.imgURI, 'PNG', 15, 30, 180, 80);
        pdf.setFontSize(12);
        pdf.text(`Rentabilidad del Patrimonio: ${this.rentabilidadPatrimonio.toFixed(2)}%`, 20, 115);
        pdf.text(`Rentabilidad del Activo Total: ${this.rentabilidadActivoTotal.toFixed(2)}%`, 20, 125);
      }
  
      pdf.save('reporte-rentabilidad.pdf');
    }).catch(error => {
      console.error("Error al exportar los gráficos a PDF", error);
    });
  }
  
  
  
}
