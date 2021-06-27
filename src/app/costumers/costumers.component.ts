import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DataHandlerService } from '../services/data-handler.service';

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

  constructor(private dataHandler: DataHandlerService) { 
    this.amountOfCostumers = this.dataHandler.getCostumersLength
  }

  ngOnInit(): void {
    this.costumers = this.dataHandler.getAmountOfCostumersByPage(this.costumersPerPage, this.page);
  }

  getServerData(event: PageEvent) {
    this.page = event.pageIndex;
    this.costumersPerPage = event.pageSize;
    this.costumers = this.dataHandler.getAmountOfCostumersByPage(event.pageSize, event.pageIndex);
  }

}
