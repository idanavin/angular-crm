import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { InputComponent } from '../input.component';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => InputAutocompleteComponent
      ),
      multi: true
    }
  ]
})
export class InputAutocompleteComponent extends InputComponent {

  @Input() options: string[] = [];

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

}
