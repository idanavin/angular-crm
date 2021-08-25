import { Component, EventEmitter, Output } from '@angular/core';
import {
  CustomersFilterService,
  Filter,
} from 'src/app/services/customers-filter.service';
import { CustomersService } from 'src/app/services/customers.service';
import { RangeType } from 'src/app/shared/range-slider/range-slider.component';

@Component({
  selector: 'app-customers-filters',
  templateUrl: './customers-filters.component.html',
  styleUrls: ['./customers-filters.component.scss'],
})
export class CustomersFiltersComponent {
  @Output() filtered: EventEmitter<boolean> = new EventEmitter<boolean>();
  customersAgeRange: RangeType;
  customersPurchasesRange: RangeType;
  filter: Filter;
  customersAgeRangeSliderValue: RangeType;
  customersPurchasesRangeSliderValue: RangeType;

  constructor(
    private customersService: CustomersService,
    private filterService: CustomersFilterService
  ) {
    this.customersAgeRange = this.customersService.getCustomersAgeRanges();
    this.customersPurchasesRange = this.customersService.getCustomersPurchasesRanges();
    this.filter = this.getEmptyFilter();
    this.customersAgeRangeSliderValue = this.filter.age.range!;
    this.customersPurchasesRangeSliderValue = this.filter.purchases.range!;
  }

  getEmptyFilter(): Filter {
    return {
      age: {
        filtered: false,
        range: {
          min: 0,
          max: 100,
        },
      },
      purchases: {
        filtered: false,
        range: {
          min: 0,
          max: 100,
        },
      },
    };
  }

  onMenuClick(): void {
    // this.customersAgeRange = this.customersService.getCustomersAgeRanges();
    if (this.filterService.filtered) {
      this.customersAgeRangeSliderValue = this.filter.age.range!;
    } else {
      this.customersAgeRangeSliderValue = this.customersAgeRange;
      this.customersPurchasesRangeSliderValue = this.customersPurchasesRange;
    }
  }

  setRangeForFilter(range: RangeType, filter: string): void {
    filter === 'age' ? this.setAgeRange(range) : this.setPurchasesRange(range);
  }

  setAgeRange(range: RangeType) {
    this.filter.age.range = range;

    if (range != this.customersAgeRange) {
      this.filter.age.filtered = true;
    } else {
      this.filter.age.filtered = false;
    }
  }

  setPurchasesRange(range: RangeType) {
    this.filter.purchases.range = range;

    if (range != this.customersAgeRange) {
      this.filter.purchases.filtered = true;
    } else {
      this.filter.purchases.filtered = false;
    }
  }

  //Filter all options
  onGoFilterClick(): void {
    this.filterService.setFilter(this.filter);
    this.filtered.emit(true);
  }

  onRemoveFilters(): void {
    this.filter = this.getEmptyFilter();
    this.filterService.removeFilters();
    this.filtered.emit(false);
  }
}
