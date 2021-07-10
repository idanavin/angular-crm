import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { countries as countryStateData } from 'src/assets/country_state.json';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() parentForm?: FormGroup

  countries: string[] = ['1', '2'];
  states: string[] = []

  constructor() {
    // !Gives a weird error, not compiling
    // this.countries = countryStateData.map((data) => data.country)
  }
  
  ngOnInit(): void {
  }

}
