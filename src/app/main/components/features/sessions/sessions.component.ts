import { Observable } from 'rxjs';
import { Sessions, SessionsAdapter } from './interfaces/sessions.interface';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { TableService } from '../../../services/table.service';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent implements OnInit{
  apiData$!: Observable<Sessions[]>;
  tableData$!: Observable<{ [key: string]: string }[]>;
  displayedColumns$!: Observable<string[]>;
  endpoint: string = 'asessions';
  propertyApiName: string = 'sessions';
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
    private tableService: TableService,
    private sessionsAdapter: SessionsAdapter
  ) {}

  ngOnInit(): void {
    this.apiData$ = this.apiService.getArrayData<Sessions>(
      this.endpoint,
      this.sessionsAdapter,
      this.propertyApiName
    );
    this.displayedColumns$ = this.tableService.prepareColumns(
      this.customColumns
    );
    this.tableData$ = this.tableService.prepareTableData(
      this.apiData$,
      this.customColumns
    );
    this.apiData$.subscribe(e=>console.log('SessionsDta' , e))
  }
}
