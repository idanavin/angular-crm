import { Injectable } from '@angular/core';
import { RandomUser } from '../domain-layer/entities/random-users';
import { FilterSlider } from '../router-pages/customers/customers-filters/customers-filter/customers-filter.component';
import { RangeType } from '../shared/sliders/range-slider/range-slider.component';
@Injectable({
  providedIn: 'root',
})
export class CustomersFilterService {
  filtered: boolean = false;
  filter: Map<string, FilterSlider> = new Map()

  constructor() {}

  setFilter(filter: FilterSlider, filterType: string) {
    if (this.filter) {
      this.filter.set(filterType, filter)
    }
    this.filtered = true;
  }

  removeFilters() {
    this.filtered = false;
    this.filter.clear();
  }

  getRangesIfFiltered(filterType: string): RangeType | null {
    const filter = this.filter.get(filterType)
    if (filter && filter.filtered) {
      return filter.range!
    }
    return null
  }

  getFilteredFromCustomersList(customers: RandomUser[]): RandomUser[] {
    if (!this.filtered) {
      return customers;
    }
    if (this.filter.get('age')?.filtered) {
      customers = this.filterAgeWithRange(customers);
    }
    if (this.filter?.get('purchases')?.filtered) {
      customers = this.filterPurchasedAmountWithRange(customers);
    }

    return customers;
  }

  filterPurchasedAmountWithRange(customers: RandomUser[]): RandomUser[] {
    const range = this.filter?.get('purchases')?.range!
    return customers.filter(
      (customer) => customer.purchased?.length! > range.min && customer.purchased?.length! < range.max
    );
  }

  //Need to move to general filtering
  filterAgeWithRange(customers: RandomUser[]): RandomUser[] {
    const range = this.filter?.get('age')?.range!
    return customers.filter(
      (customer) => customer.dob.age > range.min && customer.dob.age < range.max
    );
  }
}
