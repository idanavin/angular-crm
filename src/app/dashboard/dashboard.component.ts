import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //TODO: Get actual data with handler
  data = [
    [1, 6, 7, 5, 8, 1, 0],
    [3, 6, 7, 5, 8, 1, 0],
    [8, 6, 7, 5, 8, 1, 0]
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
