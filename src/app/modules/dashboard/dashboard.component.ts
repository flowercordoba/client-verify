// dashboard.component.ts o el componente que corresponda
import { Component } from '@angular/core';
import { ProfileToggleService } from 'src/app/shared/services/profile-toggle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public profileToggleService: ProfileToggleService) {}
}
