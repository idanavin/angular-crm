import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
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
  sort: Sort = {active: 'unsorted', direction: ''};

  constructor(public readonly costumersService: CostumersService) {
    this.costumersService.loadLocalstorage();
    this.costumers = this.costumersService.getCostumersByPage(this.costumersPerPage, this.page, this.sort);
  }

  ngOnInit(): void {
  }

  loadRandomUsers(event: PageEvent) {
    this.page = event.pageIndex;
    this.costumersPerPage = event.pageSize;
    this.costumers = this.costumersService.getCostumersByPage(event.pageSize, event.pageIndex, this.sort);
  }

  sortData(event: Sort) {
    this.sort = event
    this.costumers = this.costumersService.getCostumersByPage(this.costumersPerPage, this.page, this.sort)
  }

}
