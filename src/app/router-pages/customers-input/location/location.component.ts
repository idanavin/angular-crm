import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { countries as countryStateData } from 'src/assets/country_state.json';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() parentForm?: FormGroup

  filteredResults?: Observable<string>;
  countries: string[] = ['1', '2'];
  states: string[] = []

  constructor() {
    // !Gives a weird error, not compiling
    // this.countries = countryStateData.map((data) => data.country)
  }
  
  ngOnInit(): void {
  }

  getFormGroup(groupName: any): FormGroup {
    return this.parentForm?.get(groupName) as FormGroup;
  }
}
