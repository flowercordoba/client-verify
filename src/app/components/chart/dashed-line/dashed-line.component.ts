import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashed-line',
  templateUrl: './dashed-line.component.html',
  styleUrls: ['./dashed-line.component.scss']
})
export class DashedLineComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef;
  private chart!: ApexCharts; // Guarda la referencia de la gráfica

  ngAfterViewInit(): void {
    const options = {
      chart: {
          height: 380,
          type: 'line',
          zoom: {
              enabled: true
          },
          toolbar: {
              show: true
          }
      },
      colors: ['#556ee6', '#34c38f'],
      dataLabels: {
          enabled: false,
      },
      stroke: {
          width: [3, 3],
          curve: 'straight'
      },
      series: [{
          name: "High - 2018",
          data: [26, 24, 32, 36, 33, 31, 33]
      },
      {
          name: "Low - 2018",
          data: [14, 11, 16, 12, 17, 13, 12]
      }],
      title: {
          text: '',
          align: 'left',
          style: {
              fontWeight: '500',
          },
      },
      grid: {
          row: {
              colors: ['transparent', 'transparent'],
              opacity: 0.2
          },
          borderColor: '#f1f1f1'
      },
      markers: {
          style: 'inverted',
          size: 6
      },
      xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          title: {
              text: 'Month'
          }
      },
      yaxis: {
          title: {
              text: 'Temperature'
          },
          min: 5,
          max: 40
      },
      legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
      },
      responsive: [{
          breakpoint: 600,
          options: {
              chart: {
                  toolbar: {
                      show: false
                  }
              },
              legend: {
                  show: false
              },
          }
      }]
    };

    this.chart = new ApexCharts(this.lineChart.nativeElement, options);
    this.chart.render();
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
