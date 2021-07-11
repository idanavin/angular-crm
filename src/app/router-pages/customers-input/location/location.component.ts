import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountriesData } from 'src/assets/country_state';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() parentForm?: FormGroup;

  countries: string[];
  states: string[] = [];

  constructor(private readonly countriesData: CountriesData) {
    this.countries = this.countriesData.countries.map((data) => data.country);
  }

  ngOnInit(): void {}

  getFormGroup(groupName: any): FormGroup {
    return this.parentForm?.get(groupName) as FormGroup;
  }

  setState(country: string): void {
    const countries = this.countriesData.countries.find(
      (countries) => countries.country === country
    );
    this.states = countries?.states || []
    console.log(this.states);
    
  }
}
