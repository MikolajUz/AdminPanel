import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.createAccountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  createAccount() {
    const { email, password, confirmPassword } = this.createAccountForm.value;

    // Check email format
    if (this.createAccountForm.get('email')!.hasError('email')) {
      this.snackBar.open('Invalid email format', 'OK', { duration: 3000 });
      return;
    }

    // Check password strength
    if (password.length < 8) {
      this.snackBar.open('Password should be at least 8 characters long', 'OK', {
        duration: 3000,
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      this.snackBar.open('Passwords do not match', 'OK', { duration: 3000 });
      return;
    }

    // Check with backend if email is in the database
    this.authService.checkEmailInDatabase(email).subscribe(
      (response) => {
        if (response.exists) {
          this.snackBar.open('Email already exists in the database', 'OK', {
            duration: 3000,
          });
        } else {
          // If email is not in the database, proceed with account creation
          this.authService.registerUser({ email, password }).subscribe(
            (registerResponse) => {
              // Handle successful account creation
              this.snackBar.open('Account created successfully', 'OK', {
                duration: 3000,
              });
              // Optionally, you may navigate to the login page or perform other actions
            },
            (registerError) => {
              // Handle error during account creation
              this.snackBar.open('Error creating account', 'OK', { duration: 3000 });
            }
          );
        }
      },
      (error) => {
        // Handle error response from the backend
        this.snackBar.open('Error checking email in the database', 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
