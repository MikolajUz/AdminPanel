import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'your_backend_api_url';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http.post(registerUrl, userData);
  }

  loginUser(loginData: any): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post(loginUrl, loginData);
  }

  authenticateUser(credentials: { email: string; password: string }): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;

    return this.http.post(loginUrl, credentials).pipe(
      tap((response: any) => {
        // Store JWT token in localStorage
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  // Method to include JWT token in HTTP headers
  getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem(this.tokenKey);
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
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

  checkCurrentPassword(currentPassword: string): Observable<any> {
    const checkPasswordUrl = `${this.apiUrl}/check-password`;
    const payload = { currentPassword };

    return this.http.post(checkPasswordUrl, payload);
  }

  updatePassword(newPassword: string): Observable<any> {
    const updatePasswordUrl = `${this.apiUrl}/update-password`;
    const payload = { newPassword };

    return this.http.post(updatePasswordUrl, payload);
  }
}
