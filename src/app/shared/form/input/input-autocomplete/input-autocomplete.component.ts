import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { InputComponent } from '../input.component';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  // Same style as input
  styleUrls: ['../input.component.scss'],
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

  filteredOptions!: Observable<string[]>;

  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { 
    super();
  }
  
  ngOnInit(): void {
    this._setFilteredOptions()
  }

  private _setFilteredOptions(): void {
    this.filteredOptions = this.formField?.valueChanges.pipe(
      startWith(''),
      map((userInput) => {
        if (userInput) {
          const lowerCaseInput = userInput.toLowerCase();
          const filtered = this._filter(lowerCaseInput)!;
          this._emitIfEqual(lowerCaseInput)
          return filtered;
        } else {
          // this.filtered.emit([]);
          return this.options?.slice()!;
        }
      })
    );
  }

  private _filter(value: string) {
    return this.options?.filter((option: string) => {
      return option.toLowerCase().indexOf(value) === 0
    });
    
  }

  private _emitIfEqual(value: string): void {
    const option = this.options.find((option) => option.toLowerCase() === value)
    if (option) {
      this.emitter.emit(option)
    }
  }

  getStringFromOption(option: string): string {
    return option
  }

}
