import { Component } from '@angular/core';
import { SessionsAdapter } from '../sessions/interfaces/sessions.interface';
import { SubpagesAdapter } from '../subpages/interfaces/subpages.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor(
    public sessionsAdapter:SessionsAdapter,
    public subpagesAdapter:SubpagesAdapter
  ) {}
}
