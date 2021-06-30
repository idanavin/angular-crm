import { Component, Input, OnInit } from '@angular/core';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';

@Component({
  selector: 'app-costumer-list',
  templateUrl: './costumer-list.component.html',
  styleUrls: ['./costumer-list.component.scss']
})
export class CostumerListComponent implements OnInit {

  @Input()
  costumers!: Promise<RandomUser[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
