import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Widget} from '../widget.interface';
import {ApexNonAxisChartSeries, ChartComponent} from 'ng-apexcharts';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {JsonPipe} from '@angular/common';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  colors: string[];
};

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    ChartComponent,
    MatIconButton,
    MatIcon,
    JsonPipe
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
  @Input() widget!: Widget;
  @Output() widgetEvent = new EventEmitter<Widget>();
  public chartOptions: Partial<ChartOptions> = {};

  delete(): void {
    this.widgetEvent.emit(this.widget);
  }

  ngOnInit() {
    const percentageCompleted = (this.widget?.project?.tasksCompleted / this.widget?.project?.tasksTotal) * 100;
    this.chartOptions = {
      series: [Number(percentageCompleted.toFixed(0))], // Данные для графика
      chart: {
        height: '100%',
        width: '100%',
        type: 'radialBar',
      },
      labels: ['Прогресс'],
      colors: ["#9674da"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {},
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
}
