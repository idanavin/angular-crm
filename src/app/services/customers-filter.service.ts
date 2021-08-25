import { Injectable } from '@angular/core';
import { RandomUser } from '../domain-layer/entities/random-users';
import { RangeType } from '../shared/range-slider/range-slider.component';

export interface Filter {
  age: {
    filtered: boolean;
    range?: RangeType;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CustomersFilterService {
  filtered: boolean = false;
  filter: Filter | null = null;

  constructor() {}

  setFilter(filter: Filter) {
    this.filter = filter;
    this.filtered = true;
  }

  removeFilters() {
    this.filtered = false;
    this.filter = null;
  }

  getFilteredFromCustomersList(customers: RandomUser[]): RandomUser[] {
    if (!this.filtered) {
      return customers;
    }
    if (this.filter?.age.filtered) {
      customers = this.filterAgeWithRange(customers);
    }

    return customers;
  }

  //Need to move to general filtering
  filterAgeWithRange(customers: RandomUser[]): RandomUser[] {
    const range = this.filter?.age.range!
    return customers.filter(
      (customer) => customer.dob.age > range.min && customer.dob.age < range.max
    );
  }
}
