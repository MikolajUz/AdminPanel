import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss', '../account.scss'],
})
export class CreateAccountComponent {
  snackbarMessage: string = '';
  snackbarTime=2500
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
    const lang = 'en';
    const pass = password;

    if (password !== confirmPassword) {
      this.snackbarMessage = 'Passwords do not match';
      setTimeout(() => {
        this.snackbarMessage = '';
      }, this.snackbarTime);
      return;
    }

    console.log('{ email, pass, lang }', { email, pass, lang });

    // this.authService.checkEmailInDatabase(email).subscribe(
    //   (response) => {
    //     if (response.exists) {
    //       console.log('Email good not in db..');
    //       this.snackBar.open('Email already exists in the database', 'OK', {
    //         duration: 3000,
    //       });
    //     } else {
    //       this.authService.registerUser({ email, password }).subscribe(
    //         (registerResponse) => {
    //           console.log('registerResponse',registerResponse)
    //           this.authService.authenticateUser({ email, password }).subscribe(
    //             (authResponse) => {
    //               console.log('authResponse',authResponse)
    //               localStorage.setItem('token', authResponse.token);
    //               this.snackBar.open(
    //                 'Account created and authenticated successfully',
    //                 'OK',
    //                 {
    //                   duration: 3000,
    //                 }
    //               );
    //               console.log(
    //                 'Account created and authenticated successfully.....'
    //               );
    //             },
    //             (authError) => {
    //               console.error('Authentication error:', authError);
    //             }
    //           );
    //         },
    //         (registerError) => {
    //           console.log('Account not created and authenticated successfully');
    //           this.snackBar.open('Error creating account', 'OK', {
    //             duration: 3000,
    //           });
    //         }
    //       );
    //     }
    //   },
    //   (error) => {
    //     this.snackBar.open('Error checking email in the database', 'OK', {
    //       duration: 3000,
    //     });
    //   }
    // );

    this.authService.registerHashedUser({ email, pass, lang }).subscribe(
      (registerResponse) => {
        console.log('registerResponse', registerResponse);
      },
      (registerError) => {
        this.snackbarMessage = 'Error creating account';
        setTimeout(() => {
          this.snackbarMessage = '';
        }, 3000);
      }
    );
  }
}
