import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { RangeType } from 'src/app/shared/range-slider/range-slider.component';

@Component({
  selector: 'app-customers-filters',
  templateUrl: './customers-filters.component.html',
  styleUrls: ['./customers-filters.component.scss']
})
export class CustomersFiltersComponent implements OnInit {

  customersAgeRange: RangeType
  filterAgeRange?: RangeType

  constructor(private customersService: CustomersService) { 
    this.customersAgeRange = this.customersService.getCustomersAgeRanges();
  }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    return `${value} Years old`
  }

  onMenuClick() {
    this.customersAgeRange = this.customersService.getCustomersAgeRanges();
    this.filterAgeRange = this.customersAgeRange;
  }

  setRangeForFilter(range: RangeType) {
    this.filterAgeRange = range;
  }

  //Filter all options
  onGoFilterClick() {
  }
}
