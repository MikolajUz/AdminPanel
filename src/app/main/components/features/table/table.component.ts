import {
  Component,
  Input,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subscription,
  debounceTime,
  fromEvent,
  takeUntil,
} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

type T = any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnDestroy, AfterViewInit {
  @Input() tableData$!: Observable<T[]>;
  @Input() displayedColumns$!: Observable<string[]>;
  @Input() pageSize: number = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<T>([]);
  scrollbar = false;
  isScrollbarVisible = true;
  isLoading = true;

  private destroy$ = new ReplaySubject<void>();
  private resizeSubscription!: Subscription;

  displayedColumns: string[] = [];

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.displayedColumns$
      .pipe(takeUntil(this.destroy$))
      .subscribe((columns) => {
        this.displayedColumns = columns;
      });

    this.tableData$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200), takeUntil(this.destroy$))
      .subscribe(() => this.checkScrollbarVisibility());

    setTimeout(() => this.checkScrollbarVisibility(), 100);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private checkScrollbarVisibility() {
    const container = this.el.nativeElement.querySelector('#table-container');
    const table = this.el.nativeElement.querySelector('table');

    if (container && table) {
      const containerWidth = container.clientWidth;
      const tableWidth = table.clientWidth;

      this.isScrollbarVisible = tableWidth > containerWidth;
    } else {
      console.error('Container or table not found');
    }
  }
}
