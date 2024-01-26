import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../../../interfaces/userData.interface';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent implements OnInit {
  apiData$!: Observable<UserData[]>;
  tableData$!: Observable<{ [key: string]: string }[]>;
  displayedColumns$!: Observable<string[]>;

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.apiData$ = this.apiService.getUserData();
    this.prepareDisplayedColumns();
    this.setupTableData();
  }

  private prepareDisplayedColumns() {
    this.apiData$.subscribe((data: UserData[]) => {
      if (data && data.length > 0) {

        this.displayedColumns$ = new Observable((observer) => {
          const columns = Object.keys(data[0]).filter(
            (column) => column !== 'id'
          );
          observer.next(columns);
          observer.complete();
        });
      }
    });
  }

  private setupTableData() {
    this.tableData$ = this.apiData$.pipe(
      map((data: UserData[]) => {
        if (data && data.length > 0) {
          const transformedData = data.map((user) => {
            const row: { [key: string]: string } = {};
            Object.keys(user).forEach((key) => {
              if (key !== 'id') {
                row[key] = (user as any)[key].toString();
              }
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
