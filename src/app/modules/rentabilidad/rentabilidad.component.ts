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
// recuerda el spinner de cargando! 
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
        this.actualizarGrafico();
      }
    });
  }
  calcularResultados(): void {
    const { utilidadBruta, ventasNetas, utilidadOperacional, utilidadNeta, patrimonioLiquido, activoTotal } = this.rentabilidadForm.value;

    // Cálculos directos sin proyección
    this.margenBruto = utilidadBruta / ventasNetas;
    this.margenOperativo = utilidadOperacional / ventasNetas;
    this.margenNeto = utilidadNeta / ventasNetas;
    this.rentabilidadPatrimonio = utilidadNeta / patrimonioLiquido;
    this.rentabilidadActivoTotal = utilidadNeta / activoTotal;
  }

  actualizarGrafico(): void {
    const { utilidadBruta, ventasNetas, utilidadOperacional, utilidadNeta, patrimonioLiquido, activoTotal } = this.rentabilidadForm.value;

    const rentabilidadBruta = utilidadBruta / ventasNetas;
    const rentabilidadOperacional = utilidadOperacional / ventasNetas;
    const rentabilidadNeta = utilidadNeta / ventasNetas;
    const rentabilidadPatrimonio = utilidadNeta / patrimonioLiquido;
    const rentabilidadActivoTotal = utilidadNeta / activoTotal;

    const series = [
      {
        name: 'Margen Bruto',
        data: this.calcularProyeccion(rentabilidadBruta, 5, 0.05)
      },
      {
        name: 'Margen Operativo',
        data: this.calcularProyeccion(rentabilidadOperacional, 5, 0.05)
      },
      {
        name: 'Margen Neto',
        data: this.calcularProyeccion(rentabilidadNeta, 5, 0.05)
      },
      {
        name: 'Rentabilidad del Patrimonio',
        data: this.calcularProyeccion(rentabilidadPatrimonio, 5, 0.05)
      },
      {
        name: 'Rentabilidad del Activo Total',
        data: this.calcularProyeccion(rentabilidadActivoTotal, 5, 0.05)
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
        text: 'Análisis de Rentabilidad', 
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

    if (this.chartMargenes) {
      this.chartMargenes.updateOptions({ series: series });
    } else {
      this.chartMargenes = new ApexCharts(document.querySelector("#chart"), options);
      this.chartMargenes.render();
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
    this.chartMargenes.dataURI().then((data: { imgURI?: string, blob?: Blob }) => {
      if (data.imgURI) {
        const pdf = new jsPDF();
        // Título de la gráfica
        pdf.setFontSize(16);
        pdf.text('Titulo de la grafica', 20, 20);
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
