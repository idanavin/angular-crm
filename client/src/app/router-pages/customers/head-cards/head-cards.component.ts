import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-head-cards',
  templateUrl: './head-cards.component.html',
  styleUrls: ['./head-cards.component.scss'],
})
export class HeadCardsComponent implements OnInit {
  //TBA More stats regarding customers
  @Input() amountOfCustomers: string = '';

  constructor() {}

  ngOnInit(): void {}
}
