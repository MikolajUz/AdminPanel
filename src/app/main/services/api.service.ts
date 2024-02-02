import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserData } from '../interfaces/userData.interface';
import { UserAction } from '../interfaces/userAction.interface';
import { Sites,SitesAPI,SitesAdapter } from '../components/features/sites/interfaces/sites.interface';
import { Guests,GuestsAPI, GuestsAdapter } from '../components/features/guests/interfaces/guests.interface';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'https://anal.olgroup2.usermd.net/api';
  private users = 'userInfo';
  private actions = 'actions';
  private sites='asites'
  private guests='aguests'

  constructor(private http: HttpClient, private sitesAdapter: SitesAdapter, private guestsAdapter: GuestsAdapter) {}

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
    return this.http.get<SitesAPI>(url).pipe(map((ApiSites)=>ApiSites.sites.map(site=>this.sitesAdapter.adapt(site))))
}
  getGuestsData(): Observable<Guests[]> {
  const url = `${this.apiUrl}/${this.guests}`;
  return this.http.get<GuestsAPI>(url).pipe(map((ApiGuests)=>ApiGuests.guests.map(site=>this.guestsAdapter.adapt(site))))
}

}