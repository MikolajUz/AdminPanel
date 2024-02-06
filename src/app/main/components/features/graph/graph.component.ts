import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Sessions, SessionsAdapter } from '../sessions/interfaces/sessions.interface';

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

 

  chartOptions: any;
  chartData: any[] = [];

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private apiService: APIService,
    private sessionsAdapter: SessionsAdapter 
  ) {}

  ngAfterViewInit(): void {
    this.fetchDataAndGenerateChart();
  }

  private fetchDataAndGenerateChart(): void {
    this.apiService.getArrayData<Sessions>(this.endpoint, this.sessionsAdapter, this.propertyApiName).subscribe(data => {
      data.sort((a, b) => parseInt(b.Guest) - parseInt(a.Guest));

      
      const topGuests = data.slice(0, 3);
  
      const chartDataPoints = topGuests.map(session => ({ label: session.Name, y: +session.Guest }));
  
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
            dataPoints: chartDataPoints,
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
        const chartElement = this.elementRef.nativeElement.querySelector('.canvasjs-chart-container');
        console.log('chartElement', chartElement);
        if (chartElement) {
          const creditLink = chartElement.querySelector('.canvasjs-chart-credit');
          if (creditLink) {
            this.renderer.setStyle(creditLink, 'display', 'none');
            clearInterval(interval); 
          }
        }
      }
    }, 100); 
  }
  
  
  
}
