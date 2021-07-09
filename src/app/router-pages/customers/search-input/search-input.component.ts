import { Component, Output, OnInit, EventEmitter } from '@angular/core';
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
  filteredCustomers?: Observable<RandomUser[]>;
  allCustomers?: RandomUser[];
  @Output() filtered: EventEmitter<RandomUser[]> = new EventEmitter<
    RandomUser[]
  >();

  constructor(private customersService: CustomersService) {
    this.allCustomers = this.customersService.unsortedUsers;
    this.filteredCustomers = this.searchFormControl.valueChanges.pipe(
      startWith(''),
      map((customer) => {
        if (customer) {
          const filtered = this._filter(customer)!;
          this.filtered.emit(filtered);
          return filtered;
        } else {
          this.filtered.emit([]);
          return this.allCustomers?.slice()!;
        }
      })
    );
  }

  ngOnInit(): void {}

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.allCustomers?.filter((customer) => {
      // Object.keys(customer.name).forEach((customerName) => {
      //   return customerName.toLowerCase().indexOf(filterValue) === 0;
      // });
      return customer.name.first.toLowerCase().indexOf(filterValue) === 0 ||
        customer.name.last.toLowerCase().indexOf(filterValue) === 0 ||
        `${customer.name.first.toLowerCase()} ${customer.name.last.toLowerCase()}`.indexOf(filterValue) === 0
    });
  }
}
