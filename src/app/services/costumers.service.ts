import { Injectable } from '@angular/core';
import { costumers } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class CostumersService {

  private _costumers: Object[]

  constructor() { 
    this._costumers = costumers
  }

  get getCostumersLength(): number {
    return this._costumers.length;
  }

  getAmountOfCostumersByPage(amount: number, page: number) {
    let costumersList: any[] = [];
    const endIndex = amount * (page + 1);
    const startingIndex = endIndex - amount;
    for (let i = startingIndex; i < this._costumers.length && i < endIndex; i++) {
      costumersList.push(this._costumers[i]);
    }
    return costumersList;
  }
}
