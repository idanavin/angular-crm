import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import * as _moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CostumerFormService {

  constructor(private fb: FormBuilder) { }

  getMoment(str: string) {
    return _moment(str)
  }

  sharedForm() {
    const fg: FormGroup = this.fb.group({
      nameFirst: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      nameLast: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      avatar: ['', [
        Validators.required,
      ]],
      locationState: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      locationCity: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      locationStreet: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      gender: ['', [
        Validators.required,
      ]],
      dob: [new FormControl(_moment([1, 3, 2021])), [
        Validators.required,
      ]]
    });

    return fg;
  }
}
