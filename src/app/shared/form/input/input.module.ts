import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormErrorsModule } from '../form-errors/form-errors.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputAutocompleteCustomerSearch } from './input-autocomplete/input-autocomplete-customer-search';
import { MatIconModule } from '@angular/material/icon';
import { GenericInputComponent } from './generic-input/generic-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageModule } from '../../../language/language.module';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ButtonComponent } from '../../form/button/button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    InputComponent,
    InputAutocompleteComponent,
    InputSelectComponent,
    InputAutocompleteCustomerSearch,
    GenericInputComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    FormErrorsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [
    InputComponent,
    InputAutocompleteComponent,
    InputSelectComponent,
    InputAutocompleteCustomerSearch,
    GenericInputComponent,
    ButtonComponent,
  ],
})
export class InputModule {}
