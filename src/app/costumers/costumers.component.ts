import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../services/data-handler.service';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss']
})
export class CostumersComponent implements OnInit {

  costumers: any[] = [];

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.costumers = this.dataHandler.getAmountOfCostumersByPage(3, 1);
  }

}
