import { Observable, map } from 'rxjs';
import { Sites, SitesAdapter } from './interfaces/sites.interface';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  apiData$!: Observable<Sites[]>;
  tableData$!: Observable<{ [key: string]: string }[]>;
  displayedColumns$!: Observable<string[]>;
  endpoint: string = 'asites';
  propertyApiName: string = 'sites';

  customColumns: string[] = [
    'ID',
    'Name',
    'Owner',
    'Active',
    'Creation Date',
    'Key',
  ];

  constructor(
    private apiService: APIService,
    private tableService: TableService,
    private sitesAdapter: SitesAdapter
  ) {}

  ngOnInit(): void {
    this.apiData$ = this.apiService.getArrayData<Sites>(
      this.endpoint,
      this.sitesAdapter,
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
