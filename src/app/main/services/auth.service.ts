import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import sha1 from 'sha1';

interface HelloResponse {
  response: string; // Define the structure of the response object
}

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
  private addWebsite = '/add_website';
  private remind = '/remind';
  private sessionCookieName = 'PHPSESSID';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  hello() {
    const sessionID = this.cookieService.get(this.sessionCookieName);
    const options = {
      withCredentials: true, 
      headers: {
        'Authorization': `Bearer ${sessionID}`
      }
    };
    const urlHello = 'https://anal.olgroup2.usermd.net/api/hello';
    console.log('options', options);
    //return this.http.get(urlHello, { withCredentials: true }).subscribe(e=>console.log('hello',e));
    //return this.http.get(urlHello, { withCredentials: true })
    //return this.http.get(urlHello).subscribe((e) => console.log('hello', e));
    return this.http.get<HelloResponse>(urlHello, options).pipe(
      map(res => {
        console.log('LOGGEDmap')
        const loggedIn = res.response === 'ok';
        if (loggedIn) {
      
          console.log('LOGGED')
        }
        return loggedIn;
      })
    ).subscribe(e=>console.log('hello',e));
  }

  

  getSessionIdFromCookie(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'PHPSESSID') {
        return value;
      }
    }
    return null;
  }

  hello2() {
    const urlHello = 'https://anal.olgroup2.usermd.net/api/wow';
    console.log('urlHello', urlHello);
    this.http.get(urlHello).subscribe((e) => console.log('hello2', e));
  }

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

  loginHashedSalt(credentials: {
    email: string;
    pass: string;
  }): Observable<any> {
    const salt = 'g63%RF*^&B*&N4&)*6(&46y2(_^b34gt2rt';
    const hashedPassword = sha1(sha1(credentials.pass) + salt);
    const loginHashedUrl = `${this.apiUrl}${this.signupHashedSalt}`;
    console.log('loginHashedUrl', loginHashedUrl);
    const hashedCredentials = {
      email: credentials.email,
      pass: hashedPassword,
    };
    console.log('hashedSaltCredentialss', hashedCredentials);
    //this.hello();
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
    lang: string;
  }): Observable<any> {
    const hashedPassword = sha1(credentials.pass);
    const registerUrl = `${this.apiUrl}${this.register}`;
    const hashedCredentials = {
      email: credentials.email,
      pass: hashedPassword,
      lang: credentials.lang,
    };
    return this.http.post(registerUrl, hashedCredentials);
  }

  addWebsiteMethod(websiteData: {
    name: string;
    url: string;
    isActive: boolean;
  }): Observable<any> {
    const newWebsiteUrl = `${this.apiUrl}${this.addWebsite}`;
    return this.http.post(newWebsiteUrl, websiteData);
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
    const checkEmailUrl = `${this.apiUrl}${this.remind}`;
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
