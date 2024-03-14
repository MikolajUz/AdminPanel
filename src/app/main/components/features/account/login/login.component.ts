import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

interface Response {
  result: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../account.scss'],
})
export class LoginComponent {
  snackbarMessage: string = '';
  snackbarTime = 2500;

  hello2() {
    this.authService.hello2();
  }
  hello() {
    console.log('hello1');
    this.authService.hello();
  }
  loginForm: FormGroup;
  loginAttempts = 0;
  maxLoginAttempts = 5;
  loginDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginDisabled) {
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email && password) {
      const pass = password;
      this.authService.loginHashedSalt({ email, pass }).subscribe(
        (response: Response) => {
          console.log('response', response);
          if (response.result === 'nouser') {
            this.snackbarMessage = 'Input data are not correct.';
            setTimeout(() => {
              this.snackbarMessage = '';
            }, this.snackbarTime);
          }
          if (response.result === 'logged')
            this.router.navigate(['/main/dashboard']);
        },
        (error: any) => {
          console.log('error', error);
        }
      );
    }
  }
}
