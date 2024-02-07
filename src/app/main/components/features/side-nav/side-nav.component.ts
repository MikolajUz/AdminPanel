import { Component } from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('transform', [
      state('start', style({ transform: 'translateX(0)' })),
    ]),
  ],
})
export class SideNavComponent {
  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}