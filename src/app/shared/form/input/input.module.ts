import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormErrorsModule } from '../form-errors/form-errors.module';

@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    FormErrorsModule
  ],
  exports: [
    InputComponent
  ]
})
export class InputModule { }
