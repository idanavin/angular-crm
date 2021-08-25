import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomersFilterService, Filter } from 'src/app/services/customers-filter.service';
import { CustomersService } from 'src/app/services/customers.service';
import { RangeType } from 'src/app/shared/range-slider/range-slider.component';

@Component({
  selector: 'app-customers-filters',
  templateUrl: './customers-filters.component.html',
  styleUrls: ['./customers-filters.component.scss'],
})
export class CustomersFiltersComponent implements OnInit {
  @Output() filtered: EventEmitter<boolean> = new EventEmitter<boolean>();
  customersAgeRange: RangeType;
  filter: Filter;

  constructor(
    private customersService: CustomersService,
    private filterService: CustomersFilterService
  ) {
    this.customersAgeRange = this.customersService.getCustomersAgeRanges();
    this.filter = this.getEmptyFilter();
  }

  getEmptyFilter(): Filter {
    return {
      age: {
        filtered: false,
        range: {
          min: 0,
          max: 100
        }
      },
    }
  }

  ngOnInit(): void {}

  formatLabel(value: number) {
    return `${value} Years old`;
  }

  onMenuClick() {
    this.customersAgeRange = this.customersService.getCustomersAgeRanges();
    this.filter.age.range = this.customersAgeRange;
  }

  setRangeForFilter(range: RangeType) {
    if (range != this.customersAgeRange)
    {
      this.filter.age.filtered = true;
      this.filter.age.range = range;
    }
  }

  //Filter all options
  onGoFilterClick() {
    this.filterService.setFilter(this.filter);
    this.filtered.emit(true);
  }

  onRemoveFilters() {
    this.filter = this.getEmptyFilter();
    this.filterService.removeFilters();
    this.filtered.emit(false);
  }
}
