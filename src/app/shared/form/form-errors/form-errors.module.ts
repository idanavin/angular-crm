import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from './form-errors.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    FormErrorsComponent
  ],
  imports: [
    CommonModule,
    MatInputModule
  ],
  exports: [
    FormErrorsComponent
  ]
})
export class FormErrorsModule { }
