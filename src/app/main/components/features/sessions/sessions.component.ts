import { Observable } from 'rxjs';
import { Sessions } from './interfaces/sessions.interface';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent {
  apiData$!: Observable<Sessions[]>;
  tableData$!: Observable<{ [key: string]: string }[]>;
  displayedColumns$!: Observable<string[]>;
  customColumns: string[] = [
    'ID',
    'Name',
    'Website',
    'Creation Date',
    'Guest',
    'Identifier',
    'Browser Info',
    'Width',
    'Height',
    'Width Vp',
    'Height Vp',
  ];

  constructor(
    private apiService: APIService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.apiData$ = this.apiService.getSessionsData();
    this.displayedColumns$ = this.tableService.prepareColumns(
      this.customColumns
    );
    this.tableData$ = this.tableService.prepareTableData(
      this.apiData$,
      this.customColumns
    );
  }
}
