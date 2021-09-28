import { Component, Input } from '@angular/core';
import { CustomersFilterService } from 'src/app/services/customers-filter.service';
import { RangeType } from 'src/app/shared/sliders/range-slider/range-slider.component';

export interface FilterSlider {
  filtered: boolean;
  range?: RangeType;
}

@Component({
  selector: 'app-customers-filter',
  templateUrl: './customers-filter.component.html',
  styleUrls: ['./customers-filter.component.scss'],
})
export class CustomersFilterComponent {
  @Input() filterName!: string;
  @Input() range!: RangeType;
  @Input() rangeSliderValue!: RangeType;
  private filter: FilterSlider;

  constructor(private filtersService: CustomersFilterService) {
    this.filter = {
      filtered: false,
      range: {
        min: 0,
        max: 100,
      },
    };
    this.filtersService.setFilter(this.filter, this.filterName);
  }

  setRangeForFilter(range: RangeType) {
    if (range != this.range) {
      this.filter.filtered = true;
      this.filter.range = range;
      this.filtersService.setFilter(this.filter, this.filterName);
    } else {
      this.filter.filtered = false;
    }
  }
}
