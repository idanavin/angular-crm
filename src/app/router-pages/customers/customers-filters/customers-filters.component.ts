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
  customersAgeRangeSliderValue: RangeType;
  customersPurchasesRangeSliderValue: RangeType;

  constructor(
    private customersService: CustomersService,
    private filterService: CustomersFilterService
  ) {
    this.customersAgeRangeSliderValue = this.getRangesFor('age');
    this.customersPurchasesRangeSliderValue = this.getRangesFor('purchases');
  }

  onMenuClick(): void {
    const ageRanges = this.filterService.getRangesIfFiltered('age');
    const purchasesRanges = this.filterService.getRangesIfFiltered('purchases');

    this.customersAgeRangeSliderValue = ageRanges || this.getRangesFor('age');
    this.customersPurchasesRangeSliderValue =
      purchasesRanges || this.getRangesFor('purchases');
  }

  getRangesFor(filterType: string): RangeType {
    if (filterType === 'age') {
      return this.customersService.getCustomersAgeRanges();
    }
    return this.customersService.getCustomersPurchasesRanges();
  }

  onGoFilterClick(): void {
    this.filtered.emit(true);
  }

  onRemoveFilters(): void {
    this.filterService.removeFilters();
    this.filtered.emit(false);
  }
}
