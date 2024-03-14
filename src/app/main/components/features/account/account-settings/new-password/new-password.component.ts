import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  snackbarMessage: string = '';
  snackbarTime = 2500;
  setPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.setPasswordForm = this.formBuilder.group({
      username: [''],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  setPassword() {
    const { currentPassword, newPassword, confirmPassword } =
      this.setPasswordForm.value;

    if (newPassword.length < 8) {
      this.snackbarMessage = 'Password should be at least 8 characters long';
      setTimeout(() => {
        this.snackbarMessage = '';
      }, this.snackbarTime);
      return;
    }

    if (newPassword !== confirmPassword) {
      this.snackbarMessage = 'Passwords do not match';
      setTimeout(() => {
        this.snackbarMessage = '';
      }, this.snackbarTime);
      return;
    }

    this.authService.checkCurrentPassword(currentPassword).subscribe(
      (response) => {
        if (response.isCorrect) {
          this.authService.updatePassword(newPassword).subscribe(
            (updateResponse) => {
              this.snackbarMessage = 'Password updated successfully';
              setTimeout(() => {
                this.snackbarMessage = '';
              }, this.snackbarTime);
            },
            (updateError) => {
              this.snackbarMessage = 'Error updating password';
              setTimeout(() => {
                this.snackbarMessage = '';
              }, this.snackbarTime);
            }
          );
        } else {
          this.snackbarMessage = 'Current password incorrect';
          setTimeout(() => {
            this.snackbarMessage = '';
          }, this.snackbarTime);
        }
      },
      (error) => {
        this.snackbarMessage = 'Error during checking current password';
        setTimeout(() => {
          this.snackbarMessage = '';
        }, this.snackbarTime);
      }
    );
  }
}
