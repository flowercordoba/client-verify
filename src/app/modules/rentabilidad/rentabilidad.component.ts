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
      nombreEmpresa: [null, Validators.required],
      nitEmpresa: [null, Validators.required],
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
  
  // exportToPDF(): void {
  //   Promise.all([
  //     this.chartMargenes?.dataURI(),
  //     this.chartRentabilidad?.dataURI()
  //   ]).then((dataURIs) => {
  //     const pdf = new jsPDF();
  //     pdf.setFontSize(16);
  //     pdf.text('Reporte de Rentabilidad', 20, 20);

  //        // Acceder a los valores del formulario
  //        const nombreEmpresa = this.rentabilidadForm.get('nombreEmpresa')?.value || 'N/A';
  //        const nitEmpresa = this.rentabilidadForm.get('nitEmpresa')?.value || 'N/A';
     
  //        // Añadir los valores del formulario al PDF
  //        pdf.setFontSize(12);
  //        pdf.text(`Nombre de la Empresa: ${nombreEmpresa}`, 20, 25);
  //        pdf.text(`NIT de la Empresa: ${nitEmpresa}`, 20, 30);
  //       //  pdf.addImage(firstChartURI.imgURI, 'PNG', 15, 40, 180, 80); // Ajustar la posición Y según sea necesario

  
  //     // Añade la primera gráfica al PDF, con aserción de tipo
  //     const firstChartURI = dataURIs[0] as { imgURI?: string; blob?: Blob };
  //     if (firstChartURI.imgURI) {
  //       // pdf.addImage(firstChartURI.imgURI, 'PNG', 15, 30, 180, 80);
  //       pdf.addImage(firstChartURI.imgURI, 'PNG', 15, 40, 180, 80); // Ajustar la posición Y según sea necesario

  //       pdf.setFontSize(12);
  //       pdf.text(`Margen Bruto: ${this.margenBruto.toFixed(2)}%`, 20, 115);
  //       pdf.text(`Margen Operativo: ${this.margenOperativo.toFixed(2)}%`, 20, 125);
  //       pdf.text(`Margen Neto: ${this.margenNeto.toFixed(2)}%`, 20, 135);
  //     }
  
  //     // Añade una nueva página para el segundo gráfico y sus resultados, con aserción de tipo
  //     const secondChartURI = dataURIs[1] as { imgURI?: string; blob?: Blob };
  //     if (secondChartURI.imgURI) {
  //       pdf.addPage();
  //       pdf.setFontSize(16);
  //       pdf.text('Continuación Reporte de Rentabilidad', 20, 20);
  //       pdf.addImage(secondChartURI.imgURI, 'PNG', 15, 30, 180, 80);
  //       pdf.setFontSize(12);
  //       pdf.text(`Rentabilidad del Patrimonio: ${this.rentabilidadPatrimonio.toFixed(2)}%`, 20, 115);
  //       pdf.text(`Rentabilidad del Activo Total: ${this.rentabilidadActivoTotal.toFixed(2)}%`, 20, 125);
  //     }
  
  //     pdf.save('reporte-rentabilidad.pdf');
  //   }).catch(error => {
  //     console.error("Error al exportar los gráficos a PDF", error);
  //   });
  // }

  exportToPDF(): void {
    Promise.all([
      this.chartMargenes?.dataURI(),
      this.chartRentabilidad?.dataURI()
    ]).then((dataURIs) => {
      const pdf = new jsPDF();
      let pageNumber = 1;
  
      // Funciones addHeader y addFooter
      const addHeader = (pageNumber: number) => {
        pdf.setFillColor(100, 100, 240);
        pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 20, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.text(`Nombre de la empresa: ${this.rentabilidadForm.get('nombreEmpresa')?.value || 'N/A'}`, 20, 10);
        pdf.text(`NIT de la empresa: ${this.rentabilidadForm.get('nitEmpresa')?.value || 'N/A'}`, 20, 15);
        pdf.text(`Página ${pageNumber}`, pdf.internal.pageSize.getWidth() - 40, 15);
      };
  
      const addFooter = (pageNumber: number) => {
        const fechaCreacionPDF = new Date().toLocaleDateString();
        pdf.setFillColor(100, 100, 240);
        pdf.rect(0, pdf.internal.pageSize.getHeight() - 20, pdf.internal.pageSize.getWidth(), 20, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.text(`Fecha de creación del PDF: ${fechaCreacionPDF}`, 20, pdf.internal.pageSize.getHeight() - 15);
      };
  
      // Añadir encabezado y pie de página a la primera página
      addHeader(pageNumber);
      addFooter(pageNumber);
  
      pdf.setFontSize(16);
      pdf.text('Reporte de Rentabilidad', 20, 30);
  
      const firstChartURI = dataURIs[0] as { imgURI?: string; blob?: Blob };
      if (firstChartURI?.imgURI) {
        pdf.addImage(firstChartURI.imgURI, 'PNG', 15, 40, 180, 80);
        pdf.setFontSize(12);
        pdf.text(`Margen Bruto: ${this.margenBruto.toFixed(2)}%`, 20, 135);
        pdf.text(`Margen Operativo: ${this.margenOperativo.toFixed(2)}%`, 20, 145);
        pdf.text(`Margen Neto: ${this.margenNeto.toFixed(2)}%`, 20, 155);
      }
  
      const secondChartURI = dataURIs[1] as { imgURI?: string; blob?: Blob };
      if (secondChartURI?.imgURI) {
        // Solo añadir una nueva página si hay un segundo gráfico para mostrar
        pageNumber += 1;
        pdf.addPage();
        addHeader(pageNumber);
        addFooter(pageNumber);
        pdf.setFontSize(16);
        pdf.text('Continuación Reporte de Rentabilidad', 20, 20);
        pdf.addImage(secondChartURI.imgURI, 'PNG', 15, 30, 180, 80);
        pdf.setFontSize(12);
        pdf.text(`Rentabilidad del Patrimonio: ${this.rentabilidadPatrimonio.toFixed(2)}%`, 20, 135);
        pdf.text(`Rentabilidad del Activo Total: ${this.rentabilidadActivoTotal.toFixed(2)}%`, 20, 145);
      }
  
      pdf.save('reporte-rentabilidad.pdf');
    }).catch(error => {
      console.error("Error al exportar los gráficos a PDF", error);
    });
  }
  
  
  
  
  
}
