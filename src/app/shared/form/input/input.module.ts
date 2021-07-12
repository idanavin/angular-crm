import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormErrorsModule } from '../form-errors/form-errors.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { InputSelectComponent } from './input-select/input-select.component';

@NgModule({
  declarations: [
    InputComponent,
    InputAutocompleteComponent,
    InputSelectComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    FormErrorsModule,
    MatAutocompleteModule
  ],
  exports: [
    InputComponent,
    InputAutocompleteComponent,
    InputSelectComponent
  ]
})
export class InputModule { }
