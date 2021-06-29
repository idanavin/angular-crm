import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { CostumersService } from '../../services/costumers.service';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss']
})
export class CostumersComponent implements OnInit {

  costumers: Promise<RandomUser[]>;
  page: number = 0;
  costumersPerPage: number = 5;
  amountOfCostumers: number = 50;

  constructor(public readonly costumersService: CostumersService) {
    this.costumersService.loadLocalstorage();
    this.costumers = this.costumersService.getCostumersByPage(this.costumersPerPage, this.page);
  }

  ngOnInit(): void {
  }

  loadRandomUsers(event: PageEvent) {
    this.page = event.pageIndex;
    this.costumersPerPage = event.pageSize;
    this.costumers = this.costumersService.getCostumersByPage(event.pageSize, event.pageIndex);
  }

}
