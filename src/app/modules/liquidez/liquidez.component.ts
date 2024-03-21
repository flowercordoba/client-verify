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
  chart2: ApexCharts | null = null; 

  capitalDeTrabajo: number = 0;
  razonCorriente: number = 0;
  pruebaAcida: number = 0;
  constructor(private fb: FormBuilder) {
    this.liquidezForm = this.fb.group({
      nombreEmpresa: [null, Validators.required],
      nitEmpresa: [null, Validators.required],
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
    const { activoCorriente, pasivoCorriente, disponible, inversionesTemporales, deudores } = this.liquidezForm.value;
  
    
    const activoCorrienteNum = Number(activoCorriente);
    const pasivoCorrienteNum = Number(pasivoCorriente);
    const disponibleNum = Number(disponible);
    const inversionesTemporalesNum = Number(inversionesTemporales);
    const deudoresNum = Number(deudores);
  
    // Cálculos de liquidez
    this.capitalDeTrabajo = activoCorrienteNum - pasivoCorrienteNum;
    this.razonCorriente = activoCorrienteNum / pasivoCorrienteNum;
    this.pruebaAcida = (disponibleNum + inversionesTemporalesNum + deudoresNum) / pasivoCorrienteNum;
  
    // Preparación de las series para los gráficos
    const seriesBarras = [
      {
        name: 'Capital de Trabajo',
        data: [this.capitalDeTrabajo]
      },
      {
        name: 'Pasivo Corriente',
        data: [pasivoCorrienteNum]
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
      },
     
    ];
  
    // Opciones para la gráfica de barras
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
  
    // Opciones para la gráfica de líneas
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
  
    // Renderizar o actualizar la primera gráfica (Barras)
    if (this.chart) {
      this.chart.updateOptions(optionsBarras);
    } else {
      this.chart = new ApexCharts(document.querySelector("#chart"), optionsBarras);
      this.chart.render();
    }
  
    // Renderizar o actualizar la segunda gráfica (Líneas)
    if (this.chart2) {
      this.chart2.updateOptions(optionsLineas);
    } else {
      this.chart2 = new ApexCharts(document.querySelector("#chart2"), optionsLineas);
      this.chart2.render();
    }
  }
  

  

  exportToPDF(): void {
    Promise.all([
      this.chart?.dataURI(),
      this.chart2?.dataURI()
    ]).then((dataURIs) => {
      const pdf = new jsPDF();
  
      const nombreEmpresa = this.liquidezForm.get('nombreEmpresa')?.value || 'N/A';
      const nitEmpresa = this.liquidezForm.get('nitEmpresa')?.value || 'N/A';
  
      const addHeader = (pageNumber: number) => {
        pdf.setFillColor(100, 100, 240);
        pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 20, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.text(`Nombre de la empresa: ${nombreEmpresa}`, 20, 10);
        pdf.text(`NIT de la empresa: ${nitEmpresa}`, 20, 15);
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
  
      let pageNumber = 1;
      addHeader(pageNumber);
      addFooter(pageNumber);
  
      pdf.setFontSize(16);
      pdf.setTextColor(0);
      pdf.text('Reporte de Liquidez', 20, 30);
  
      const firstChart = dataURIs[0] as { imgURI: string; blob?: Blob };
      if (firstChart.imgURI) {
        pdf.addImage(firstChart.imgURI, 'PNG', 15, 40, 180, 80);
      }
  
      pdf.setFontSize(12);
      pdf.text(`Capital de Trabajo: ${this.capitalDeTrabajo.toFixed(2)}`, 20, 130);
      pdf.text(`Razón Corriente: ${this.razonCorriente.toFixed(2)}`, 20, 140);
      pdf.text(`Prueba Ácida: ${this.pruebaAcida.toFixed(2)}`, 20, 150);
  
      const secondChart = dataURIs[1] as { imgURI: string; blob?: Blob };
      if (secondChart?.imgURI) {
        pdf.addPage();
        pageNumber += 1;
        addHeader(pageNumber);
        addFooter(pageNumber);
        pdf.setFontSize(16);
        pdf.setTextColor(0);
        pdf.text('Reporte de Liquidez - Continuación', 20, 25);
        pdf.addImage(secondChart.imgURI, 'PNG', 15, 35, 90, 45);
      }
  
      pdf.save('reporte-liquidez.pdf');
    }).catch(error => {
      console.error("Error al exportar los gráficos a PDF", error);
    });
  }
  
  
  
  
 
}
