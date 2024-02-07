import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() axisX!: string;
  @Input() axisY!: string;
  @Input() endpoint!: string;
  @Input() propertyApiName!: string;
  @Input() adapter!: any;
  @Input() xProperty!: string;
  @Input() yProperty!: string;

  chartOptions: any;
  chartData: any[] = [];

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private apiService: APIService
  ) {}

  ngAfterViewInit(): void {
    this.fetchDataAndGenerateChart();
  }

  private fetchDataAndGenerateChart(): void {
    this.apiService
      .getArrayData<any[]>(this.endpoint, this.adapter, this.propertyApiName)
      .subscribe((data) => {
        data.sort(
          (a, b) =>
            parseInt(b[this.yProperty as keyof typeof b]) -
            parseInt(a[this.yProperty as keyof typeof a])
        );

        const topData = data.slice(0, 3);

        const chartData = topData.map((data) => ({
          label: data[this.yProperty as keyof typeof data],
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
      });
  }

  private hideCreditLink(): void {
    const interval = setInterval(() => {
      if (this.elementRef && this.elementRef.nativeElement) {
        const chartElement = this.elementRef.nativeElement.querySelector(
          '.canvasjs-chart-container'
        );
        console.log('chartElement', chartElement);
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
