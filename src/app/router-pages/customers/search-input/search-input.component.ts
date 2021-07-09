import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  searchFormControl: FormControl = new FormControl();
  filteredCustomers?: Observable<void | RandomUser[]>;
  allCustomers?: RandomUser[];

  constructor(private customersService: CustomersService) {
    this.allCustomers = this.customersService.unsortedUsers
    this.filteredCustomers = this.searchFormControl.valueChanges.pipe(
      startWith(''),
      map((customer) =>
        customer ? this._filter(customer) : this.allCustomers?.slice()
      )
    )
  }

  ngOnInit(): void {
    
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    this.allCustomers?.filter(state => state.name.first.toLowerCase().indexOf(filterValue) === 0)
  }
}
