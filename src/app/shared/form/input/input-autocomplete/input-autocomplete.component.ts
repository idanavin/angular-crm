import { Component, Input } from '@angular/core';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { InputComponent } from '../input.component';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent extends InputComponent {

  @Input() options: string[] = [];

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

}
