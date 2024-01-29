import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

type T = any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() tableData$!: Observable<T[]>;
  @Input() pageSize: number = 5;
  @Input() displayedColumns$!: Observable<string[]>;
  @Input() displayedRows$!: Observable<string[]>;

  lowValue = 0;
  highValue: number = this.pageSize;
  scrollbar = false;
  isScrollbarVisible = false;

  private destroy$ = new Subject<void>();

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkScrollbarVisibility();
      this.cdr.detectChanges();
    }, 0);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkScrollbarVisibility() {
    const container = this.el.nativeElement.querySelector('#table-container');
    const table = this.el.nativeElement.querySelector('table');

    if (container && table) {
      const containerWidth = container.clientWidth;
      const tableWidth = table.clientWidth;

      this.isScrollbarVisible = tableWidth > containerWidth;
    }
  }

  toggleScrollbar() {
    this.scrollbar = !this.scrollbar;
    this.checkScrollbarVisibility();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScrollbarVisibility();
  }
}
