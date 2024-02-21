import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  prepareColumns(columns: string[]): Observable<string[]> {
    let customColumnsSubject = new BehaviorSubject<string[]>([]); //normal Observable with initial value
    let customColumns$: Observable<string[]> =
      customColumnsSubject.asObservable(); // asObservable=> subscribers cannot call next on it
    customColumnsSubject.next(columns); // changing is only possible through customColumnsSubject
    return customColumns$;
  }

  prepareTableData(
    data: Observable<any[]>,
    customColumns: string[]
  ): Observable<{ [key: string]: string }[]> {
    return data.pipe(
      map((items) => {
        if (items.length > 0) {
          return items.map((item) => {
            const row: { [key: string]: string } = {};
            Object.keys(item).forEach((key, index) => {
              const displayKey = customColumns[index];
              row[displayKey] = item[key];
            });
            return row;
          });
        } else {
          return [];
        }
      })
    );
  }
}
