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

    if (password !== confirmPassword) {
      this.snackBar.open('Passwords do not match', 'OK', { duration: 3000 });
      return;
    }

    if (this.createAccountForm.get('email')!.invalid) {
      this.snackBar.open('Invalid email format', 'OK', { duration: 3000 });
      return;
    }

    this.authService.checkEmailInDatabase(email).subscribe(
      (response) => {
        if (response.exists) {
          this.snackBar.open('Email already exists in the database', 'OK', {
            duration: 3000,
          });
        } else {
          this.authService.registerUser({ email, password }).subscribe(
            (registerResponse) => {
              this.authService.authenticateUser({ email, password }).subscribe(
                (authResponse) => {
                  localStorage.setItem('token', authResponse.token);
                  this.snackBar.open(
                    'Account created and authenticated successfully',
                    'OK',
                    {
                      duration: 3000,
                    }
                  );
                },
                (authError) => {
                  console.error('Authentication error:', authError);
                }
              );
            },
            (registerError) => {
              this.snackBar.open('Error creating account', 'OK', {
                duration: 3000,
              });
            }
          );
        }
      },
      (error) => {
        this.snackBar.open('Error checking email in the database', 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
