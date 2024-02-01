import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserData } from '../interfaces/userData.interface';
import { UserAction } from '../interfaces/userAction.interface';
import { Sites,SitesAPI,SitesAdapter } from '../components/features/sites/interfaces/sites.interface';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'https://anal.olgroup2.usermd.net/api';
  private users = 'userInfo';
  private actions = 'actions';
  private sites='asites'

  constructor(private http: HttpClient, private sitesAdapter: SitesAdapter) {}

  postUserData(postData: UserData): Observable<any> {
    const url = `${this.apiUrl}/${this.users}`;
    return this.http.post(url, postData);
  }

  postAction(postData: UserAction[]): Observable<any> {
    const url = `${this.apiUrl}/${this.actions}`;
    return this.http.post(url, postData);
  }
  getUserData(): Observable<UserData[]> {
    const url = `http://localhost:3000/${this.users}`;
    return this.http.get<UserData[]>(url);
  }
  getActionData(): Observable<UserAction[]> {
    const url = `${this.apiUrl}/${this.actions}`;
    return this.http.get<UserAction[]>(url);
  }
  getSitesData(): Observable<Sites[]> {
    const url = `${this.apiUrl}/${this.sites}`;
    console.log('url',url)
    return this.http.get<SitesAPI>(url).pipe(map((ApiSites)=>ApiSites.sites.map(site=>this.sitesAdapter.adapt(site))))
}
}