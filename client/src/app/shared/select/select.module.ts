import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    MatListModule
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
