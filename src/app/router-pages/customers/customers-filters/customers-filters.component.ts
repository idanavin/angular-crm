import { Component, EventEmitter, Output } from '@angular/core';
import { CustomersFilterService } from 'src/app/services/customers-filter.service';
import { CustomersService } from 'src/app/services/customers.service';
import { RangeType } from 'src/app/shared/range-slider/range-slider.component';

@Component({
  selector: 'app-customers-filters',
  templateUrl: './customers-filters.component.html',
  styleUrls: ['./customers-filters.component.scss'],
})
export class CustomersFiltersComponent {
  @Output() filtered: EventEmitter<boolean> = new EventEmitter<boolean>();
  filterValues: Map<string, RangeType> = new Map();
  filteredValues: Map<string, RangeType> = new Map();
  customersAgeRangeSliderValue: RangeType;
  customersPurchasesRangeSliderValue: RangeType;
  customersMoneySpentSliderValue: RangeType;

  constructor(
    private customersService: CustomersService,
    private filterService: CustomersFilterService
  ) {
    this.customersAgeRangeSliderValue = this.getRangesFor('age');
    this.customersPurchasesRangeSliderValue = this.getRangesFor('purchases');
    this.customersMoneySpentSliderValue = this.getRangesFor('moneySpent');
    this.getFilterValues();
  }

  getFilterValues() {
    this.filterValues.set(
      'ageRanges',
      this.customersService.getCustomersAgeRanges()
    );
    this.filterValues.set(
      'purchaseRanges',
      this.customersService.getCustomersPurchasesRanges()
    );
    this.filterValues.set(
      'moneySpentRange',
      this.customersService.getMoneySpentRanges()
    );
  }

  onMenuClick(): void {
    const ageRanges = this.filterService.getRangesIfFiltered('age');
    ageRanges && this.filteredValues.set('ageRanges', ageRanges);
    const purchaseRanges = this.filterService.getRangesIfFiltered('purchases');
    purchaseRanges && this.filteredValues.set('purchaseRanges', purchaseRanges);
    const moneySpentRange =
      this.filterService.getRangesIfFiltered('moneySpent');
    moneySpentRange && this.filteredValues.set('moneySpent', moneySpentRange);

    this.customersAgeRangeSliderValue = ageRanges || this.getRangesFor('age');
    this.customersPurchasesRangeSliderValue =
      purchaseRanges || this.getRangesFor('purchases');
  }

  // getRangesFor(filterName: string): RangeType {
  //   return this.filterValues.get(filterName)!;
  // }

  getFilteredValue(filterName: string): RangeType {
    return this.filteredValues.get(filterName)!;
  }

  getRangesFor(filterType: string): RangeType {
    switch (filterType) {
      case 'age': {
        return this.customersService.getCustomersAgeRanges();
      }
      case 'purchases': {
        return this.customersService.getCustomersPurchasesRanges();
      }
      default: {
        return this.customersService.getMoneySpentRanges();
      }
    }
  }

  onGoFilterClick(): void {
    this.filtered.emit(true);
  }

  onRemoveFilters(): void {
    this.filterService.removeFilters();
    this.filtered.emit(false);
  }
}
