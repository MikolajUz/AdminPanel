import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { GenericAdapter, RawData } from '../interfaces/API.interface';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'https://anal.olgroup2.usermd.net/api';

  constructor(private http: HttpClient) {}

  getArrayData<T>(
    endpoint: string,
    adapter: GenericAdapter<T>,
    propertySelector: string
  ): Observable<T[]> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<any>(url).pipe(
      map((response) =>
        response[propertySelector].map((rawData: RawData) =>
          adapter.adapt(rawData)
        )
      ),
      catchError((error) => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }
}
