<div *ngIf="empresas.length > 0; else noData" class="container mx-auto p-4">
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nombre de la Empresa
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Representante Legal
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr *ngFor="let empresa of empresas">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ empresa.nombre }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ empresa.repLegal }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<ng-template #noData>
  <div class="text-center">
    <p>No hay empresas disponibles.</p>
  </div>
</ng-template>



import { Component, OnInit } from '@angular/core';
import { GestionService } from '../../services/gestion.service';
import { Empresa } from '../../interfaces/gestion.interface';

@Component({
  selector: 'app-lista-gestiones',
  templateUrl: './lista-gestiones.component.html',
  styleUrls: ['./lista-gestiones.component.scss']
})
export class ListaGestionesComponent implements OnInit {
  empresas: Empresa[] = []; // Cambio a almacenar solo las empresas

  constructor(private gestionService: GestionService) {}

  ngOnInit(): void {
    this.cargarGestiones();
  }

  cargarGestiones(): void {
    this.gestionService.getGestiones().subscribe({
      next: (resp) => {
        // Mapear la respuesta para extraer solo la información de las empresas
        this.empresas = resp.gestiones.map(gestion => gestion.empresaId).filter(empresa => empresa !== null) as Empresa[];
      },
      error: (error) => console.error('Error al cargar las gestiones:', error)
    });
  }
}
