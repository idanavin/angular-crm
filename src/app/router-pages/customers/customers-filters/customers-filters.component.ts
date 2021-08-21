import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-filters',
  templateUrl: './customers-filters.component.html',
  styleUrls: ['./customers-filters.component.scss']
})
export class CustomersFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    return `${value} Years old`
  }

}
