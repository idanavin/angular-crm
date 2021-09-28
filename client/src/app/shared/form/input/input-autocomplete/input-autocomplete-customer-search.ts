import { Component, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs";
import { RandomUser } from "src/app/domain-layer/entities/random-users";
import { InputAutocompleteComponent } from "./input-autocomplete.component";

@Component({
    selector: 'app-input-autocomplete-customer-search',
  templateUrl: './input-autocomplete.component.html',
  // Same style as input
  styleUrls: ['../input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => InputAutocompleteCustomerSearch
      ),
      multi: true
    }
  ]
})
export class InputAutocompleteCustomerSearch extends InputAutocompleteComponent {
    
    // ? Think of a way to extend behavior of InputAutocompleteComponent with input with RandomUser[] Type
    // filteredOptions!: Observable<RandomUser[]>;

    constructor() {
        super();
    }

    // getStringFromOption(option: RandomUser): string {
    //     return ''
    // }
}