import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { UserData } from '../../../interfaces/userData.interface';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  sitesData$!: Observable<UserData[]>;
  displayedColumns: string[] = [];

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.sitesData$ = this.apiService.getUserData();
    this.sitesData$.subscribe((data: UserData[]) => {
      // Check if data is not null and has at least one element
      if (data && data.length > 0) {
        this.displayedColumns = ['id', ...Object.keys(data[0])];
      }
    });
  }

  // Include 'id' in displayed columns
  getDisplayedColumns(): string[] {
    // Exclude 'id' from the displayed columns
    return this.displayedColumns.filter(column => column !== 'id');
  }
  
}
