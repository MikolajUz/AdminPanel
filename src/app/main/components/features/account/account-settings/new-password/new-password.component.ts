import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  setPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.setPasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  setPassword() {
    const { currentPassword, newPassword, confirmPassword } = this.setPasswordForm.value;

    // Check password strength
    if (newPassword.length < 8) {
      this.snackBar.open('Password should be at least 8 characters long', 'OK', {
        duration: 3000,
      });
      return;
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      this.snackBar.open('Passwords do not match', 'OK', { duration: 3000 });
      return;
    }

    // Check with backend if current password is correct
    this.authService.checkCurrentPassword(currentPassword).subscribe(
      (response) => {
        if (response.isCorrect) {
          // If current password is correct, proceed with updating password
          this.authService.updatePassword(newPassword).subscribe(
            (updateResponse) => {
              // Handle successful password update
              this.snackBar.open('Password updated successfully', 'OK', {
                duration: 3000,
              });
              // Optionally, you may navigate to another page or perform other actions
            },
            (updateError) => {
              // Handle error during password update
              this.snackBar.open('Error updating password', 'OK', { duration: 3000 });
            }
          );
        } else {
          // If current password is incorrect, show error message
          this.snackBar.open('Current password is incorrect', 'OK', {
            duration: 3000,
          });
        }
      },
      (error) => {
        // Handle error response from the backend
        this.snackBar.open('Error checking current password', 'OK', {
          duration: 3000,
        });
      }
    );
  }
}