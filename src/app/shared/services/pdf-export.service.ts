import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  constructor() { }

  async exportToPDF(chartData: { chart: any; chart2: any }, liquidezForm: FormGroup, capitalDeTrabajo: number, razonCorriente: number, pruebaAcida: number): Promise<void> {
    try {
      const dataURIs = await Promise.all([
        chartData.chart?.dataURI(),
        chartData.chart2?.dataURI()
      ]);

      const pdf = new jsPDF();
      const nombreEmpresa = liquidezForm.get('nombreEmpresa')?.value || 'N/A';
      const nitEmpresa = liquidezForm.get('nitEmpresa')?.value || 'N/A';

      let pageNumber = 1;
      this.addHeader(pdf, nombreEmpresa, nitEmpresa, pageNumber);
      this.addFooter(pdf, pageNumber, new Date().toLocaleDateString());

      // Lógica para agregar el contenido al PDF (resumido por brevedad)
      // ...

      pdf.save('reporte-liquidez.pdf');
    } catch (error) {
      console.error("Error al exportar los gráficos a PDF", error);
    }
  }

  private addHeader(pdf: jsPDF, nombreEmpresa: string, nitEmpresa: string, pageNumber: number): void {
    pdf.setFillColor(100, 100, 240);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 20, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text(`Nombre de la empresa: ${nombreEmpresa}`, 20, 10);
    pdf.text(`NIT de la empresa: ${nitEmpresa}`, 20, 15);
    pdf.text(`Página ${pageNumber}`, pdf.internal.pageSize.getWidth() - 40, 15);
  }

  private addFooter(pdf: jsPDF, pageNumber: number, fechaCreacionPDF: string): void {
    pdf.setFillColor(100, 100, 240);
    pdf.rect(0, pdf.internal.pageSize.getHeight() - 20, pdf.internal.pageSize.getWidth(), 20, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text(`Fecha de creación del PDF: ${fechaCreacionPDF}`, 20, pdf.internal.pageSize.getHeight() - 15);
  }
}
