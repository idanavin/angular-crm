import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';

export interface AgeRange {
  min: number,
  max: number
}

@Component({
  selector: 'app-customers-filters',
  templateUrl: './customers-filters.component.html',
  styleUrls: ['./customers-filters.component.scss']
})
export class CustomersFiltersComponent implements OnInit {

  customersAgeRange: AgeRange = {min: 0, max: 100}

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    return `${value} Years old`
  }

  onMenuClick() {
    this.customersAgeRange = this.customersService.getCustomersAgeRanges();
  }
}
