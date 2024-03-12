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
    totalPasivo: [null, Validators.required],
    totalActivo: [null, Validators.required],
    pasivoCorriente: [null, Validators.required],
    pasivoTotal: [null, Validators.required],
    ventasNetas: [null, Validators.required],
    patrimonio: [null, Validators.required],
    activoCorriente: [null, Validators.required],
    cuentasPorCobrarClientes: [null, Validators.required],
    costoDeVenta: [null, Validators.required],
    inventario: [null, Validators.required],
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
    const { totalPasivo, totalActivo, pasivoCorriente, pasivoTotal, ventasNetas, patrimonio } = this.gestionForm.value;

    const nivelEndeudamiento = totalPasivo / totalActivo;
    const concentracionEndeudamientoCortoPlazo = pasivoCorriente / pasivoTotal;
    const endeudamientoVentas = pasivoTotal / ventasNetas;
    const multiplicadorCapital = totalActivo / patrimonio;
    
    const series = [
      {
        name: 'Nivel de Endeudamiento',
        data: this.calcularProyeccion(nivelEndeudamiento, 5, 0.05)
      },
      {
        name: 'Concentración Endeudamiento Corto Plazo',
        data: this.calcularProyeccion(concentracionEndeudamientoCortoPlazo, 5, 0.05)
      },
      {
        name: 'Endeudamiento / Ventas',
        data: this.calcularProyeccion(endeudamientoVentas, 5, 0.05)
      },
      {
        name: 'Multiplicador de Capital',
        data: this.calcularProyeccion(multiplicadorCapital, 5, 0.05)
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
       text: 'Margen bruto, Margen operativo y Margen neto', 
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

   if (this.chart) {
     this.chart.updateOptions({ series: series });
   } else {
     this.chart = new ApexCharts(document.querySelector("#chart"), options);
     this.chart.render();
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
