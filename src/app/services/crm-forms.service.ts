import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CrmFormsService {
  constructor(private formBuilder: FormBuilder) {}

  getProductCategoryForm() {
    const fg: FormGroup = this.formBuilder.group({
      category: ['']
    })
    return fg;
  }

  getCustomersForm() {
    const fg: FormGroup = this.formBuilder.group({
      name: this.formBuilder.group({
        title: [''],
        first: ['', [Validators.required, Validators.minLength(2)]],
        last: ['', [Validators.required, Validators.minLength(2)]],
      }),
      gender: ['', [Validators.required]],
      location: this.formBuilder.group({
        state: [''],
        city: [''],
        street: this.formBuilder.group({
          name: [''],
          number: [''],
        }),
      }),
      email: ['', [Validators.required, Validators.email]],
      dob: this.formBuilder.group({
        date: ['', [Validators.required]],
        age: 0,
      }),
      registered: this.formBuilder.group({ date: [''] }),
      phone: ['', [Validators.required, Validators.minLength(2)]],
      id: this.formBuilder.group({ value: '4564564' }),
      picture: this.formBuilder.group({ thumbnail: [''] }),
    });
    return fg;
  }
}
