import { Component } from '@angular/core';
import { GestionService } from './services/gestion.service';
import jsPDF from 'jspdf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent {
  gestion: any = {}; 

    totalGestiones: number = 0; 

  // recuerda el spinner de cargando! 
  gestionForm: FormGroup;
 chart: ApexCharts | null = null;

 ngOnInit(): void {
  this.gestionForm = this.fb.group({
    ventasNetas: [null, Validators.required],
    cuentasPorCobrar: [null, Validators.required],
    costoDeVenta: [null, Validators.required],
    inventarios: [null, Validators.required],
    cuentasPorPagar: [null, Validators.required]
  });
}

 constructor(private fb: FormBuilder) {
    this.gestionForm = this.fb.group({
        totalPasivo: [null, Validators.required],
        totalActivo: [null, Validators.required],
        pasivoCorriente: [null, Validators.required],
        pasivoTotal: [null, Validators.required],
        ventasNetas: [null, Validators.required],
        patrimonio: [null, Validators.required]
      });
      
 }

 actualizarGrafico(): void {
  const { ventasNetas, cuentasPorCobrar, costoDeVenta, inventarios, cuentasPorPagar } = this.gestionForm.value;

  const diasEnElAno = 365;

 // Cálculos para los datos de cada año, con redondeo a tres decimales
 const periodoDeCobro = parseFloat((diasEnElAno * (cuentasPorCobrar / ventasNetas)).toFixed(3));
 const periodoDeInventario = parseFloat((diasEnElAno * (inventarios / costoDeVenta)).toFixed(3));
 const periodoDePago = parseFloat((diasEnElAno * (cuentasPorPagar / costoDeVenta)).toFixed(3));


  // Suponiendo que los valores calculados no cambian durante el periodo proyectado
  const dataPeriodoDeCobro = Array(5).fill(periodoDeCobro);
  const dataPeriodoDeInventario = Array(5).fill(periodoDeInventario);
  const dataPeriodoDePago = Array(5).fill(periodoDePago);

  const series = [
    {
      name: 'Periodo de Cobro (días)',
      data: dataPeriodoDeCobro
    },
    {
      name: 'Periodo de Inventario (días)',
      data: dataPeriodoDeInventario
    },
    {
      name: 'Periodo de Pago (días)',
      data: dataPeriodoDePago
    }
  ];

  const options = {
    series: series,
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      type: 'category',
      categories: ['2024', '2025', '2026', '2027', '2028'],
      title: {
        text: 'Año',
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Días',
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#263238'
        }
      }
    },
    title: {
      text: 'Análisis de Periodo de Cobro, Inventario y Pago',
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#263238'
      }
    },
    stroke: {
      curve: 'straight',
      width: 3
    },
    markers: {
      size: 5
    },
    tooltip: {
      x: {
        format: 'yyyy'
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  if (this.chart) {
    this.chart.updateOptions(options);
  } else {
    this.chart = new ApexCharts(document.querySelector("#chart"), options);
    this.chart.render();
  }
}




 exportToPDF() {
   this.chart.dataURI().then((data: { imgURI?: string, blob?: Blob }) => {
     if (data.imgURI) {
       const pdf = new jsPDF();
       // Título de la gráfica
       pdf.setFontSize(16);
       pdf.text('Graficas', 20, 20);
       // Añade la gráfica al PDF
       pdf.addImage(data.imgURI, 'PNG', 15, 20, 180, 150);

       // pdf.addImage(data.imgURI, 'PNG', 10, 30, 180, 100); // Ajusta según necesidades
       pdf.save('dashed-line-chart.pdf');
     } else {
       console.error("No se pudo obtener la URI de la imagen de la gráfica.");
     }
   }).catch(error => console.error("Error al exportar la gráfica a PDF", error));
 }


  // ngOnInit(): void {
  //   this.getUsers();
  // }

  // getUsers(): void {
  //   this.userService.getUsers().subscribe({
  //     next: (response: any) => {
  //       this.totalUsuarios = response.total; 
  //     },
  //     error: (err) => console.error(err),
  //   });
  // }

  

}
