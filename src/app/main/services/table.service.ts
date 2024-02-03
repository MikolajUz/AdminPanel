import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  prepareColumns(columns: string[]): Observable<string[]> {
    let customColumnsSubject = new BehaviorSubject<string[]>([]);
    let customColumns$: Observable<string[]> =
      customColumnsSubject.asObservable();
    customColumnsSubject.next(columns);
    return customColumns$;
  }

  prepareTableData(
    data: Observable<any[]>,
    customColumns: string[]
  ): Observable<{ [key: string]: string }[]> {
    return data.pipe(
      map((items) => {
        if (items && items.length > 0) {
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
