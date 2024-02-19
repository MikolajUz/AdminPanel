import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://anal.olgroup2.usermd.net/api/users';
  private signupSimple = '/signup-simple';
  private logout = 'https://anal.olgroup2.usermd.net/api/users/logout'; // w sensie endpoint, wysyłąsz tylko GET bez danych
  private register = 'https://anal.olgroup2.usermd.net/api/users/register';

  constructor(private http: HttpClient) {}

  testPost()  {
    const base = 'analytics';
    const url = 'abcdefghij';
    console.log('test Method');
     this.http.post('https://link1.castomo.com/set', { base, url }).subscribe(e=>console.log('post',e));
  }

  testGet() {
    const base = 'analytics';
    const code = 'l18VYed0h9uV';

    this.http
      .post('https://link1.castomo.com/get', { base, code })
      .subscribe((e) => console.log('get', e));
  }

  registerUser(userData: any): Observable<any> {
    const registerUrl = `${this.apiUrl}${this.signupSimple}`;
    console.log('registerUrl', registerUrl);
    return this.http.post(registerUrl, userData);
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

  login(credentials: { email: string; password: string }): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;

    return this.http.post(loginUrl, credentials);
  }
  checkEmailInDatabase(email: string): Observable<any> {
    const checkEmailUrl = `${this.apiUrl}${this.signupSimple}`;
    console.log('checkEmailUrl', checkEmailUrl);
    const payload = { email };
    console.log('email', email);
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
