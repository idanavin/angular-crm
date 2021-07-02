import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => InputComponent
      ),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor  {

  @Input()
  public parentForm?: FormGroup

  @Input()
  public fieldName: string = '';

  @Input()
  public label: string = '';

  public value: string = '';
  public changed!: (value: string) => void;
  public touched!: () => void;
  public isDisabled?: boolean;

  constructor() { }

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  onChange (event: Event): void {
    const value: string =
      (<HTMLInputElement>event.target).value
    
    this.changed(value);
  }
  writeValue(value: string): void {
    this.value = value
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }


}
