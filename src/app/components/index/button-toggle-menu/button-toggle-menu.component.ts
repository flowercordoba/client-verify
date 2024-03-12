import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-button-toggle-menu',
  templateUrl: './button-toggle-menu.component.html',
  styleUrls: ['./button-toggle-menu.component.scss']
})
export class ButtonToggleMenuComponent {
  private _isSidebarVisible = new BehaviorSubject<boolean>(true);
  isSidebarVisible = this._isSidebarVisible.asObservable();

  @Output() toggle = new EventEmitter<void>();  // Este evento se emitirá cuando se haga clic en el botón

  toggleMenu(): void {
    this._isSidebarVisible.next(!this._isSidebarVisible.value);
    this.toggle.emit();  // Emite un evento cada vez que se haga clic en el botón
  }
}
