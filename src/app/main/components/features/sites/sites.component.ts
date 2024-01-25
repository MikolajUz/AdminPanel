import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { UserData } from '../../../interfaces/userData.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  sitesData$!: Observable<UserData[]>;
  displayedColumns: string[] = [];

  pageSize?: number = 5;
  lowValue = 0;
  highValue?: number = this.pageSize;

  constructor(private apiService: APIService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.sitesData$ = this.apiService.getUserData();
    this.sitesData$.subscribe((data: UserData[]) => {
      if (data && data.length > 0) {
        this.displayedColumns = ['id', ...Object.keys(data[0])];
      }
    });
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns.filter((column) => column !== 'id');
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
  }
}
