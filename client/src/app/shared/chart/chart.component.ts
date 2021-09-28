import { Component, Input, OnInit } from '@angular/core';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() data: number[] = [];
  //TODO: set timeout to fake server request and change isLoading
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
        backgroundColor: 'transparent',
      },
      xAxis: [
        {
          type: 'category',
          // boundaryGap: false,
          data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: this.data,
          itemStyle: {
            color: 'rgb(153, 153, 153)'
          },
          animationDelay: (idx: number) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

}
