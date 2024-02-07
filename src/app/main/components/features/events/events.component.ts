import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Events, EventsAdapter } from './interfaces/events.interface';
import { APIService } from '../../../services/api.service';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-events',

  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  apiData$!: Observable<Events[]>;
  tableData$!: Observable<{ [key: string]: string }[]>;
  displayedColumns$!: Observable<string[]>;
  endpoint: string = 'aevents';
  propertyApiName: string = 'events';
  customColumns: string[] = [
    'ID',
    'Name',
    'Website',
    'Sub Page',
    'Type',
    'Value',
    'Session',
    'Guest',
    'Date',
  ];

  constructor(
    private apiService: APIService,
    private eventsAdapter: EventsAdapter,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.apiData$ = this.apiService.getArrayData<Events>(
      this.endpoint,
      this.eventsAdapter,
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
