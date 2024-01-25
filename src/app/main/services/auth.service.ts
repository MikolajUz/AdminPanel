import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'your_backend_api_url';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http.post(registerUrl, userData);
  }

  loginUser(loginData: any): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post(loginUrl, loginData);
  }

  changePassword(passwordData: any): Observable<any> {
    const changePasswordUrl = `${this.apiUrl}/change-password`;
    return this.http.post(changePasswordUrl, passwordData);
  }

  resetPassword(resetPasswordData: any): Observable<any> {
    const resetPasswordUrl = `${this.apiUrl}/reset-password`;
    return this.http.post(resetPasswordUrl, resetPasswordData);
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;

    return this.http.post(loginUrl, credentials);
  }
  checkEmailInDatabase(email: string): Observable<any> {
    const checkEmailUrl = `${this.apiUrl}/check-email`;
    const payload = { email };

    return this.http.post(checkEmailUrl, payload);
  }
}
