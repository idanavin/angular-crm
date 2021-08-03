import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormValidator {
  validate(control: AbstractControl): void {
    if (control.valid) return;

    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      let group: FormGroup = <FormGroup>control;
      Object.keys(group.controls).forEach((fieldName) => {
        const control = group.get(fieldName)!;
        this.validate(control);
      });
    } else if (control instanceof FormArray) {
      (<FormArray>control).controls.forEach((c: AbstractControl) => {
        this.validate(c);
      });
    }
  }
}
