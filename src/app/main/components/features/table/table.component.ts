import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

type T = any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() tableData$!: Observable<T[]>;
  @Input() pageSize: number = 5;
  @Input() displayedColumns$!: Observable<string[]>;
  @Input() displayedRows$!: Observable<string[]>;

  lowValue = 0;
  highValue: number = this.pageSize;

  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
  }
}
