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

  page: number = 0;
  costumersPerPage: number = 5;
  amountOfCostumers: number = 50;

  constructor(public readonly costumersService: CostumersService) { 
    this.costumersService.loadRandomUsers(this.costumersPerPage, this.page);
  }

  ngOnInit(): void {
  }

  loadRandomUsers(event: PageEvent) {
    this.page = event.pageIndex;
    this.costumersPerPage = event.pageSize;
    this.costumersService.loadRandomUsers(event.pageSize, event.pageIndex);
  }

}
