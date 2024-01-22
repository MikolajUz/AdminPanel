// Example in side-nav.component.ts
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

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
