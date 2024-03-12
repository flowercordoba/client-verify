import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileToggleService {
  private isVisible = new BehaviorSubject<boolean>(true);
  private isSidebarVisible = new BehaviorSubject<boolean>(true);  // Nuevo estado para el sidebar


  // Observable que se puede suscribir para obtener cambios de estado
  public isVisible$ = this.isVisible.asObservable();
  public isSidebarVisible$ = this.isSidebarVisible.asObservable();

  constructor() {}

  // Método para cambiar la visibilidad
  public toggleVisibility(): void {
    this.isVisible.next(!this.isVisible.value);
  }

  public toggleSidebarVisibility(): void {  // Nuevo método para el sidebar
    this.isSidebarVisible.next(!this.isSidebarVisible.value);
  }
}
