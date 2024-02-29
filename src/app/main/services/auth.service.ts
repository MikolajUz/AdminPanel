import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import sha1 from 'sha1';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://anal.olgroup2.usermd.net/api/users';
  private signupSimple = '/signup-simple';
  private signupSimpleHashed = '/signup-simplehashed';
  private signupHashedSalt = '/signup';
  private register = '/register';
  private logoutUrl = '/logout';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; pass: string }): Observable<any> {
    const loginUrl = `${this.apiUrl}${this.signupSimple}`;
    return this.http.post(loginUrl, credentials);
  }

  loginHashed(credentials: { email: string; pass: string }): Observable<any> {
    const doubleHashedPassword = sha1(sha1(credentials.pass));
    const loginHashedUrl = `${this.apiUrl}${this.signupSimpleHashed}`;
    console.log('loginHashedUrl', loginHashedUrl);
    const hashedCredentials = {
      email: credentials.email,
      pass: doubleHashedPassword,
    };
    console.log('hashedCredentials', hashedCredentials);
    return this.http.post(loginHashedUrl, hashedCredentials);
  }

  loginHashedSalt(credentials: { email: string; pass: string }): Observable<any> {
    const salt='g63%RF*^&B*&N4&)*6(&46y2(_^b34gt2rt'
    const hashedPassword = sha1(sha1(credentials.pass)+salt);
    const loginHashedUrl = `${this.apiUrl}${this.signupHashedSalt}`;
    console.log('loginHashedUrl', loginHashedUrl);
    const hashedCredentials = {
      email: credentials.email,
      pass: hashedPassword,
    };
    console.log('hashedSaltCredentials', hashedCredentials);
    return this.http.post(loginHashedUrl, hashedCredentials);
  }

  logout() {
    const logoutUrl = `${this.apiUrl}${this.logoutUrl}`;
    return this.http.get(logoutUrl);
  }

  registerUser(userData: any): Observable<any> {
    const registerUrl = `${this.apiUrl}${this.register}`;
    return this.http.post(registerUrl, userData);
  }

  registerHashedUser(credentials: {
    email: string;
    pass: string;
    lang:string;
  }): Observable<any> {
    const hashedPassword = sha1(credentials.pass);
    const registerUrl = `${this.apiUrl}${this.register}`;
    const hashedCredentials = {
      email: credentials.email,
      pass: hashedPassword,
      lang:credentials.lang
    };
    return this.http.post(registerUrl, hashedCredentials);
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
