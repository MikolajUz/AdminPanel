import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit, OnDestroy {
  @Input() title!: string;
  @Input() axisX!: string;
  @Input() axisY!: string;
  @Input() endpoint!: string;
  @Input() propertyApiName!: string;
  @Input() adapter!: any;
  @Input() xProperty!: string;
  @Input() yProperty!: string;
  @Input() showTopValues: boolean = true;
  @Input() numberOfValuesToShow: number = 3;

  chartOptions: any;
  chartData: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  private subscription: Subscription | undefined;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private apiService: APIService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.fetchDataAndGenerateChart();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private fetchDataAndGenerateChart(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.subscription = this.apiService
      .getArrayData<any[]>(this.endpoint, this.adapter, this.propertyApiName)
      .subscribe(
        (data) => {
          this.loading = false;
          this.error = null;

          data.sort(
            (a, b) =>
              +a[this.yProperty as keyof typeof a] -
              +b[this.yProperty as keyof typeof b]
          );
          let slicedData = this.showTopValues
            ? data.slice(0, this.numberOfValuesToShow)
            : data.slice(data.length - this.numberOfValuesToShow, data.length);

          const chartData = slicedData.map((data) => ({
            label: this.getShortenedPropertyName(
              data[this.xProperty as keyof typeof data]
            ),
            y: +data[this.yProperty as keyof typeof data],
          }));

          this.chartOptions = {
            title: {
              text: this.title,
            },
            theme: 'light2',
            animationEnabled: true,
            exportEnabled: true,
            axisX: {
              title: this.axisX,
            },
            axisY: {
              title: this.axisY,
              includeZero: true,
              valueFormatString: '',
            },
            data: [
              {
                type: 'column',
                yValueFormatString: '',
                color: '#01b8aa',
                dataPoints: chartData,
              },
            ],
          };

          this.chartData = [this.chartOptions];

          this.hideCreditLink();
        },
        (error) => {
          this.loading = false;
          this.error = 'Error fetching data. Please try again later.';
          console.error('API Error:', error);
          this.cdr.detectChanges();
        }
      );
  }
  private getShortenedPropertyName(propertyName: string): string {
    return propertyName.length > 10
      ? propertyName.substring(0, 10) + '...'
      : propertyName;
  }

  private hideCreditLink(): void {
    const interval = setInterval(() => {
      if (this.elementRef && this.elementRef.nativeElement) {
        const chartElement = this.elementRef.nativeElement.querySelector(
          '.canvasjs-chart-container'
        );
        if (chartElement) {
          const creditLink = chartElement.querySelector(
            '.canvasjs-chart-credit'
          );
          if (creditLink) {
            this.renderer.setStyle(creditLink, 'display', 'none');
            clearInterval(interval);
          }
        }
      }
    }, 100);
  }
}
