import { Component } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

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
export class SideNavComponent {}
