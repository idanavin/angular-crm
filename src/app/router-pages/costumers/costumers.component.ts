import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CostumersService } from '../../services/costumers.service';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss']
})
export class CostumersComponent implements OnInit {

  page: number = 0;
  costumersPerPage: number = 5;
  amountOfCostumers: number;
  costumers: any[] = [];

  constructor(public readonly costumersService: CostumersService) { 
    this.amountOfCostumers = this.costumersService.getCostumersLength
  }

  ngOnInit(): void {
    this.costumers = this.costumersService.getAmountOfCostumersByPage(this.costumersPerPage, this.page);
    this.costumersService.loadRandomUsers(this.costumersPerPage, this.page);
  }

  getServerData(event: PageEvent) {
    this.page = event.pageIndex;
    this.costumersPerPage = event.pageSize;
    this.costumers = this.costumersService.getAmountOfCostumersByPage(event.pageSize, event.pageIndex);
  }

  loadRandomUsers(event: PageEvent) {
    this.page = event.pageIndex;
    this.costumersPerPage = event.pageSize;
    this.costumersService.loadRandomUsers(event.pageSize, event.pageIndex);
  }

}
