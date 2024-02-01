import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Observable, map } from 'rxjs';
import { Sites } from './interfaces/sites.interface';

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
    this.apiData$.subscribe((e) => console.log('sites', e));
    this.prepareDisplayedColumns();
    this.setupTableData();
  }

  private prepareDisplayedColumns() {
   this.apiData$.subscribe((data: Sites[]) => {
      if (data && data.length > 0) {
        this.displayedColumns$ = new Observable((observer) => {
          let columns = ['ID', 'Name', 'Owner', 'Active', 'Creation_Date', 'Key'];
          observer.next(columns);
          observer.complete();
        });
      }
   });
  }
  

  private setupTableData() {
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
