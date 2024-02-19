import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
TestMEthodGET() {
  this.authService.testGet()
}
TestMEthod() {
this.authService.testPost()
}
  loginForm: FormGroup;
  loginAttempts = 0;
  maxLoginAttempts = 5;
  loginDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
      this.authService.authenticateUser({ email, password }).subscribe(
        (response) => {
          this.loginAttempts = 0;
        },
        (error) => {
          this.loginAttempts++;

          if (this.loginAttempts >= this.maxLoginAttempts) {
            this.loginDisabled = true;
          }
        }
      );
    }
  }

  enableLoginButton() {
    setTimeout(() => {
      this.loginDisabled = false;
    }, 30000); 
  }
}
