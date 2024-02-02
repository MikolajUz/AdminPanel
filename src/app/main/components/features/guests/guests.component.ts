import { Observable, map } from 'rxjs';
import { Guests } from './interfaces/guests.interface';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
})
export class GuestsComponent implements OnInit {
  apiData$!: Observable<Guests[]>;
  tableData$!: Observable<{ [key: string]: string }[]>;
  displayedColumns$!: Observable<string[]>;
  customColumns: string[] = [
    'ID',
    'Name',
    'Website',
    'First Visit Date',
    'Browser Info',
    'Width',
    'Height',
    'Width Vp',
    'Height Vp',
  ];

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.apiData$ = this.apiService.getGuestsData();
    this.prepareTableData();
  }

  private prepareTableData() {
    this.displayedColumns$ = new Observable((observer) => {
      let columns = observer.next(this.customColumns);
      observer.complete();
    });

    this.tableData$ = this.apiData$.pipe(
      map((data: Guests[]) => {
        if (data && data.length > 0) {
          const transformedData = data.map((guest) => {
            const row: { [key: string]: string } = {};
            Object.keys(guest).forEach((key) => {
              const displayKey = this.convertToHumanReadable(key);
              row[displayKey] = (guest as any)[key].toString();
            });
            return row;
          });

          return transformedData;
        }
        return [];
      })
    );
  }

  private convertToHumanReadable(key: string): string {
    const words = key.replace(/([a-z])([A-Z])/g, '$1 $2');

    const humanReadable = words.replace(/_/g, ' ');

    return humanReadable.replace(/\b\w/g, (match) => match.toUpperCase());
  }
}
