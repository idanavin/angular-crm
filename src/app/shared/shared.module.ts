import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from './chart/chart.module';
import { DialogModule } from './dialog/dialog.module';
import { FormErrorsModule } from './form/form-errors/form-errors.module';
import { InputModule } from './form/input/input.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartModule,
    DialogModule,
    FormErrorsModule,
    InputModule,
  ],
  exports: [
    ChartModule, 
    DialogModule, 
    FormErrorsModule, 
    InputModule
  ]
})
export class SharedModule {}
