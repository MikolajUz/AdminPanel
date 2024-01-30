// app-header.component.ts

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() loginClick = new EventEmitter<void>();
  @Output() registerClick = new EventEmitter<void>();

  onLoginClick() {
    this.loginClick.emit();
  }

  onRegisterClick() {
    this.registerClick.emit();
  }
}
