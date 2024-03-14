import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-snackbar',

  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss',
})
export class CustomSnackbarComponent {
  @Input() message: string = '';
}