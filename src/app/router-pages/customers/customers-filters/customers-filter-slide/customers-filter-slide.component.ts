import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { CustomersFilterService } from 'src/app/services/customers-filter.service';
import { RangeType } from 'src/app/shared/sliders/range-slider/range-slider.component';
import { FilterSlider } from '../customers-filter/customers-filter.component';

@Component({
  selector: 'app-customers-filter-slide',
  templateUrl: './customers-filter-slide.component.html',
  styleUrls: ['./customers-filter-slide.component.scss']
})
export class CustomersFilterSlideComponent implements OnInit {
  @Input() filterName!: string;
  @Input() range!: RangeType;
  @Input() rangeSliderValue!: RangeType;
  maxValue?: number;
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

  ngOnInit() {
    this.maxValue = this.range.max
  }

  setRangeForFilter(value: RangeType) {
    if (value.max != this.range.max) {
      this.filter.filtered = true;
      this.filter.range = {
        min: 0,
        max: value.max || this.range.max
      };
      this.filtersService.setFilter(this.filter, this.filterName);
    } else {
      this.filter.filtered = false;
    }
  }

}
