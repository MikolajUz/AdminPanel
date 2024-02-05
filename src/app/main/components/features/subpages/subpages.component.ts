import { Observable, map } from 'rxjs';
import { Subpages, SubpagesAdapter } from './interfaces/subpages.interface';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-subpages',

  templateUrl: './subpages.component.html',
  styleUrl: './subpages.component.scss'
})
export class SubpagesComponent implements OnInit {
  apiData$!: Observable<Subpages[]>;
  tableData$!: Observable<{ [key: string]: string }[]>;
  displayedColumns$!: Observable<string[]>;
  endpoint: string = 'apages';
  propertyApiName: string = 'pages';

  customColumns: string[] = [
    'ID',
    'URL',
    'Session',
    'Website',
    'Guest',
    'Visit Date',
    'Loading Time'
  ];

  constructor(
    private apiService: APIService,
    private tableService: TableService,
    private subpagesAdapter:SubpagesAdapter
  ) {}

  ngOnInit(): void {
    this.apiData$ = this.apiService.getArrayData<Subpages>(
      this.endpoint,
      this.subpagesAdapter,
      this.propertyApiName
    );
    this.displayedColumns$ = this.tableService.prepareColumns(
      this.customColumns
    );
    this.tableData$ = this.tableService.prepareTableData(
      this.apiData$,
      this.customColumns
    );
  }
}

 