import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/userData.interface';
import { UserAction } from '../interfaces/userAction.interface';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'http://localhost:3000';
  private users = 'userInfo';
  private actions = 'actions';

  constructor(private http: HttpClient) {}

  postUserData(postData: UserData): Observable<any> {
    const url = `${this.apiUrl}/${this.users}`;
    return this.http.post(url, postData);
  }

  postAction(postData: UserAction[]): Observable<any> {
    const url = `${this.apiUrl}/${this.actions}`;
    return this.http.post(url, postData);
  }
  getUserData(): Observable<UserData[]> {
    const url = `${this.apiUrl}/${this.users}`;
    return this.http.get<UserData[]>(url);
  }
  getActionData(): Observable<UserAction[]> {
    const url = `${this.apiUrl}/${this.actions}`;
    return this.http.get<UserAction[]>(url);
  }
}
