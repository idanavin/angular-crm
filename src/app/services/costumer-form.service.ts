import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import * as _moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CostumerFormService {
  constructor(private fb: FormBuilder) {}

  getMoment(str: string) {
    return _moment(str).get('year');
  }

  getCostumerForm() {
    const fg: FormGroup = this.fb.group({
      name: this.fb.group({
        title: [''],
        first: ['', [Validators.required, Validators.minLength(2)]],
        last: ['', [Validators.required, Validators.minLength(2)]],
      }),
      gender: ['', [Validators.required]],
      location: this.fb.group({
        state: [''],
        city: [''],
        street: [''],
      }),
      email: ['', [Validators.required, Validators.email]],
      dob: this.fb.group({
        date: ['', [Validators.required]],
        age: 11,
      }),
      registered: this.fb.group({ date: [''] }),
      phone: ['', [Validators.required, Validators.minLength(2)]],
      id: this.fb.group({ value: '4564564' }),
      picture: this.fb.group({ thumbnail: [''] }),
    });
    return fg;
  }
}
