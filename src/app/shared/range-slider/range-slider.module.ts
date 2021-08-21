import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSliderComponent } from './range-slider.component'
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    RangeSliderComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatDividerModule
  ],
  exports: [
    RangeSliderComponent
  ]
})
export class RangeSliderModule { }
