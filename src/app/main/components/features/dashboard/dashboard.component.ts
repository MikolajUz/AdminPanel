import { Component } from '@angular/core';
import { SessionsAdapter,Sessions } from '../sessions/interfaces/sessions.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor(
    public sessionsAdapter:SessionsAdapter
  ) {}
}
