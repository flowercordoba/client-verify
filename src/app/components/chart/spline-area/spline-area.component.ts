import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-spline-area',
  templateUrl: './spline-area.component.html',
  styleUrls: ['./spline-area.component.scss']
})
export class SplineAreaComponent implements AfterViewInit {
  @ViewChild('splineArea') splineArea: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    const options: ApexCharts.ApexOptions = {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      series: [{
        name: 'SUM de RENTABILIDAD REAL',
        data: [34, 40, 28, 52, 42, 109, 100]
      }, {
        name: 'SUM de CDT90 (Bancos y Corporaciones)',
        data: [32, 60, 34, 46, 34, 52, 41]
      }],
      colors: ['#556ee6', '#34c38f'],
      xaxis: {
        type: 'datetime',
        categories: ["1/10/1995", "1/01/2000", "1/01/2005", "1/01/2010", "1/01/2015", "1/01/2020"],
      },
      grid: {
        borderColor: '#f1f1f1',
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      }
    };

    const chart = new ApexCharts(this.splineArea.nativeElement, options);
    chart.render();
  }
}
