import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../services/data-handler.service';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss']
})
export class CostumersComponent implements OnInit {

  page: number = 1;
  costumersPerPage: number = 5;
  costumers: any[] = [];

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.costumers = this.dataHandler.getAmountOfCostumersByPage(this.costumersPerPage, this.page);
  }

}
