import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from './chart/chart.module';
import { DialogModule } from './dialog/dialog.module';
import { FormErrorsModule } from './form/form-errors/form-errors.module';
import { InputModule } from './form/input/input.module';
import { PaginatorModule } from './paginator/paginator.module';
import { CardModule } from './card/card.module';
import { SelectModule } from './select/select.module';
import { RangeSliderModule } from './range-slider/range-slider.module';
import { CustomMenuItemModule } from './custom-menu-item/custom-menu-item.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ChartModule,
    DialogModule,
    FormErrorsModule,
    InputModule,
    PaginatorModule,
    CardModule,
    SelectModule,
    RangeSliderModule,
    CustomMenuItemModule,
  ],
  exports: [
    ChartModule, 
    DialogModule, 
    FormErrorsModule, 
    InputModule,
    PaginatorModule,
    CardModule,
    SelectModule,
    RangeSliderModule,
    CustomMenuItemModule
  ]
})
export class SharedModule {}
