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
export class CustomersFormService {
  constructor(private fb: FormBuilder) {}

  getMoment(str: string) {
    return _moment(str).get('year');
  }

  getCustomersForm() {
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
        street: this.fb.group({
          name: [''],
          number: ['']
        }),
      }),
      email: ['', [Validators.required, Validators.email]],
      dob: this.fb.group({
        date: ['', [Validators.required]],
        age: 0,
      }),
      registered: this.fb.group({ date: [''] }),
      phone: ['', [Validators.required, Validators.minLength(2)]],
      id: this.fb.group({ value: '4564564' }),
      picture: this.fb.group({ thumbnail: [''] }),
    });
    return fg;
  }
}
