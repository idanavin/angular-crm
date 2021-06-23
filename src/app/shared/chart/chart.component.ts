import { Component, Input, OnInit } from '@angular/core';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() data: number[] = [4, 6, 7, 5, 8, 1, 0];
  isLoading = false;
  options: EChartsOption = {};

  initOpts = {
    renderer: 'svg',
    width: 400,
    height: 400
  };

  constructor() { }

  ngOnInit(): void {
    this.options = {
      tooltip: {},
      grid: {
        backgroundColor: 'transparant',
      },
      xAxis: [
        {
          type: 'category',
          // boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: this.data,
          animationDelay: (idx: number) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

}
