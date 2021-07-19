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

  getTotalSpendingOfUser(user: RandomUser): number {
    const totalCostArray = user.purchased?.map(purchased => purchased.total_cost)
    let totalCost = 0
    totalCostArray?.forEach(purchase => totalCost += parseFloat(purchase))
    return totalCost
  }

}
