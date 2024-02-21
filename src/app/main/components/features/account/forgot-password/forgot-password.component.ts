import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendResetLink() {
    const emailControl = this.forgotPasswordForm.get('email');

    if (emailControl && this.forgotPasswordForm.valid) {
      if (emailControl.hasError('email')) {
        this.snackBar.open('Invalid email format', 'OK', {
          duration: 3000,
        });
        return;
      }

      this.authService.checkEmailInDatabase(emailControl.value).subscribe(
        (response) => {
        },
        (error) => {
          this.snackBar.open('Email not found in the database', 'OK', {
            duration: 3000,
          });
        }
      );
    }
  }
}
