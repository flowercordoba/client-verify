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
