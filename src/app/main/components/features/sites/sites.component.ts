// sites.component.ts

import { Observable, map } from 'rxjs';
import { Sites } from './interfaces/sites.interface';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  apiData$!: Observable<Sites[]>;
  tableData$!: Observable<{ [key: string]: string }[]>;
  displayedColumns$!: Observable<string[]>;

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.apiData$ = this.apiService.getSitesData();
    this.prepareTableData();
  }

  private prepareTableData() {
    this.displayedColumns$ = new Observable((observer) => {
      let columns = ['ID', 'Name', 'Owner', 'Active', 'Creation_Date', 'Key'];
      observer.next(columns);
      observer.complete();
    });

    this.tableData$ = this.apiData$.pipe(
      map((data: Sites[]) => {
        if (data && data.length > 0) {
          const transformedData = data.map((user) => {
            const row: { [key: string]: string } = {};
            Object.keys(user).forEach((key) => {
              row[key] = (user as any)[key].toString();
            });
            return row;
          });

          return transformedData;
        }
        return [];
      })
    );
  }
}
