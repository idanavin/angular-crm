import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

  filteredOptions?: Observable<string[]>;

  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { 
    super();
  }

  ngOnInit(): void {
    this.filteredOptions = this.formField?.valueChanges.pipe(
      startWith(''),
      map((option) => {
        if (option) {
          const lowerCaseOption = option.toLowerCase();
          const filtered = this._filter(lowerCaseOption)!;
          this._emitIfEqual(lowerCaseOption)
          return filtered;
        } else {
          // this.filtered.emit([]);
          return this.options?.slice()!;
        }
      })
    );
  }

  private _filter(value: string) {
    return this.options?.filter((option) => {
      return option.toLowerCase().indexOf(value) === 0
    });
  }

  private _emitIfEqual(value: string): void {
    const option = this.options.find((option) => option.toLowerCase() === value)
    if (option) {
      this.emitter.emit(option)
    }
  }

}
