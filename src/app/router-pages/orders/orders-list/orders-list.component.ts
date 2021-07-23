import { Component, Input, OnInit } from '@angular/core';
import { Purchased } from 'src/app/domain-layer/entities/random-users';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  @Input() orders?: Purchased[];

  constructor() { }

  ngOnInit(): void {
  }

}
