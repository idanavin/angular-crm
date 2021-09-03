import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { SimpleSliderComponent } from './simple-slider/simple-slider.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';



@NgModule({
  declarations: [SimpleSliderComponent, RangeSliderComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    MatDividerModule,
    FormsModule
  ],
  exports: [SimpleSliderComponent, RangeSliderComponent]
})
export class SlidersModule { }
