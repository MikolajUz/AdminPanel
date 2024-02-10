import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  authenticateUser(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;

    return this.http.post(loginUrl, credentials, { observe: 'response' }).pipe(
      tap((response) => {
        const authToken = response.headers.get('Authorization');
        if (authToken) {
          document.cookie = `auth_token=${authToken}; HttpOnly`;
        }
      })
    );
  }

  getAuthHeaders(): HttpHeaders {
    const authToken = this.getCookie('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  }

  private getCookie(name: string): string {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    if (match) return match[2];
    return '';
  }

  changePassword(passwordData: any): Observable<any> {
    const changePasswordUrl = `${this.apiUrl}/change-password`;
    return this.http.post(changePasswordUrl, passwordData, {
      headers: this.getAuthHeaders(),
    });
  }
  resetPassword(resetPasswordData: any): Observable<any> {
    const resetPasswordUrl = `${this.apiUrl}/reset-password`;
    return this.http.post(resetPasswordUrl, resetPasswordData, {
      headers: this.getAuthHeaders(),
    });
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

    return this.http.post(checkPasswordUrl, payload, {
      headers: this.getAuthHeaders(),
    });
  }

  updatePassword(newPassword: string): Observable<any> {
    const updatePasswordUrl = `${this.apiUrl}/update-password`;
    const payload = { newPassword };

    return this.http.post(updatePasswordUrl, payload, {
      headers: this.getAuthHeaders(),
    });
  }
}
