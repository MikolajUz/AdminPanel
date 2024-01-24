import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    const { email, password } = this.loginForm.value;

    // Check if email and password are not null or undefined
    if (email && password) {
      // Call your AuthService method here
      this.authService.login({ email, password }).subscribe(
        // Handle success response
        response => {
          // Handle successful login
        },
        // Handle error response
        error => {
          // Handle login error
        }
      );
    }
  }
}
