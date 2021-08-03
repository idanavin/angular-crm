import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInputComponent),
      multi: true,
    },
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class GenericInputComponent implements ControlValueAccessor {
  @Input()
  public placeholder: string = '';

  @Input()
  public label: string = '';

  @Input()
  formControlName!: string;

  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';

  @Input()
  public iconPrefix?: string;

  @Input()
  public iconSuffix?: string;

  @Input()
  public autoComplete: 'on' | 'off' | 'name' | 'email' | 'username' | 'tel' =
    'off';

  public value: string = '';
  public changed!: (value: string) => void;
  public touched!: () => void;
  public isDisabled: boolean = false;

  formField!: AbstractControl;

  constructor(private parentFormGroupDirective: FormGroupDirective) {}
  ngOnInit(): void {
    this.formField = this.parentFormGroupDirective.control.get(
      this.formControlName
    )!;

    this.label = this.label || this.placeholder;
  }

  get formFieldError(): Validators {
    return this.formField!.errors!;
  }

  onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;

    this.changed(value);
  }
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
