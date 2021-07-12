import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from '../input.component';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['../input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
})
// * Does not include input but extend ControlValueAccessor implemented on InputComponent
export class InputSelectComponent extends InputComponent {
  @Input()
  public select: string[] | undefined;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
