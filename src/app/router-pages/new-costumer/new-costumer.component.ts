import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { CostumerFormService } from 'src/app/services/costumer-form.service';

@Component({
  selector: 'app-new-costumer',
  templateUrl: './new-costumer.component.html',
  styleUrls: ['./new-costumer.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class NewCostumerComponent implements OnInit {

  form: FormGroup;
  createdClient: RandomUser | undefined;
  // date: string | undefined;

  constructor(private costumerFormService: CostumerFormService) {
    this.form = this.costumerFormService.sharedForm();
  }

  ngOnInit(): void {
  }

  // onChange (event: Event): void {
  //   const value: string =
  //     (<HTMLInputElement>event.target).value
  //   this.date = this.costumerFormService.getMoment(value)
  // }

  onSubmit() {
    console.log(this.form.value.dob.toISOString());
    const client = this.form.value
    this.createdClient = {
      name: {
        title: '',
        first: client.nameFirst,
        last: client.nameLast
      },
      gender: client.gender,
      location: {
        state: client.locationState,
        city: client.locationCity,
        street: client.locationStreet
      },
      email: client.email,
      dob: {
        date: client.dob.toDate(),
        age: 11
      },
      registered: {date: client.dob.toDate()},
      phone: client.phoneNumber,
      id: {value: '4564564'},
      picture: {thumbnail: client.avatar}

    }
    console.log(this.createdClient);
    
  }


}
