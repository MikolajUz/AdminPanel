import { Observable } from 'rxjs';
import { Guests, GuestsAdapter } from './interfaces/guests.interface';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
})
export class GuestsComponent implements OnInit {
  apiData$!: Observable<Guests[]>;
  tableData$!: Observable<{ [key: string]: string }[]>;
  displayedColumns$!: Observable<string[]>;
  endpoint: string = 'aguests';
  propertyApiName: string = 'guests';
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

  constructor(
    private apiService: APIService,
    private guestsAdapter: GuestsAdapter,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.apiData$ = this.apiService.getArrayData<Guests>(
      this.endpoint,
      this.guestsAdapter,
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
