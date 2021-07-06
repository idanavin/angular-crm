import { Component, Input, OnInit } from '@angular/core';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  @Input()
  customers!: Promise<RandomUser[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
