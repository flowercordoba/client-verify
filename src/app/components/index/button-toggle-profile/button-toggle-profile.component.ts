import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-button-toggle-profile',
  templateUrl: './button-toggle-profile.component.html',
  styleUrls: ['./button-toggle-profile.component.scss']
})
export class ButtonToggleProfileComponent {

  private _isProfileVisible = new BehaviorSubject<boolean>(true);
  isProfileVisible = this._isProfileVisible.asObservable();

  toggleProfile(): void {
    this._isProfileVisible.next(!this._isProfileVisible.value);
  }

}
