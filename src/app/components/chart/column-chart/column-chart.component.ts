import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import jsPDF, { RGBAData } from 'jspdf';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements AfterViewInit {
  @ViewChild('chart') chartElement!: ElementRef;
    private chart!: ApexCharts; // Asegura que la instancia de ApexCharts sea privada y esté tipada correctamente.

    ngAfterViewInit(): void {
        const options = {
          chart: {
              height: 150,
              type: 'bar',
              toolbar: {
                  show: true,
              }
          },
          title: {
              text: 'Análisis Financiero', // Aquí agregas el título de la gráfica
              align: 'center', // Alineación del título: 'left', 'center' o 'right'
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
          series: [{
              name: 'rotacionCapitalTrabajo',
              data: [46, 57, 59, 54, 62, 58, 64, 60, 66]
          }, {
              name: 'rotacionPatrimonioNeto',
              data: [74, 83, 102, 97, 86, 106, 93, 114, 94]
          }, {
              name: 'riesgoPais',
              data: [37, 42, 38, 26, 47, 50, 54, 55, 43]
          }],
          colors: ['#34c38f', '#556ee6', '#f46a6a'],
          xaxis: {
              categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          },
          yaxis: {
              title: {
                  text: '$ (thousands)',
                  style: {
                      fontWeight: '250',
                  },
              }
          },
          grid: {
              borderColor: '#f1f1f1',
          },
          fill: {
              opacity: 1
          },
          tooltip: {
              y: {
                  formatter: function (val: string) {
                      return "$ " + val + " thousands";
                  }
              }
          }
        };
    
        this.chart = new ApexCharts(this.chartElement.nativeElement, options);
        this.chart.render();
    }
    



  exportToPDF() {
    this.chart.dataURI().then((data: { imgURI?: string, blob?: Blob }) => {
      if (data.imgURI) {
        const pdf = new jsPDF();
        pdf.addImage(data.imgURI, 'PNG', 15, 20, 180, 150);
        pdf.save('chart.pdf');
      } else {
        console.error("No se pudo obtener la URI de la imagen de la gráfica.");
      }
    }).catch(error => console.error("Error al exportar la gráfica a PDF", error));
  }
  
}
