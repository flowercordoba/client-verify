import { Component } from '@angular/core';
import { ProfileToggleService } from '../services/profile-toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private profileToggleService: ProfileToggleService) {}

  onToggleProfileClick(): void {
    this.profileToggleService.toggleVisibility();
  }

  onToggleMenuClick(): void {  
    this.profileToggleService.toggleSidebarVisibility();
  }
  onToggleMenu(): void {
    this.profileToggleService.toggleSidebarVisibility();
  }
}
