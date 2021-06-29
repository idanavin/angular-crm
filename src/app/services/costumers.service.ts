import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { costumers } from '../data/data';
import { RandomUser, RandomUsers } from '../domain-layer/entities/random-users';

@Injectable({
  providedIn: 'root',
})
export class CostumersService {
  private _costumers: Object[];

  readonly pageUsers: Map<number, RandomUser[]> = new Map<
    number,
    RandomUser[]
  >();

  constructor(private readonly httpClient: HttpClient) {
    this._costumers = costumers;
  }

  get getCostumersLength(): number {
    return this._costumers.length;
  }

  getAmountOfCostumersByPage(amount: number, page: number) {
    let costumersList: any[] = [];
    const endIndex = amount * (page + 1);
    const startingIndex = endIndex - amount;
    for (
      let i = startingIndex;
      i < this._costumers.length && i < endIndex;
      i++
    ) {
      costumersList.push(this._costumers[i]);
    }
    return costumersList;
  }

  async loadRandomUsers(
    itemsPerPage: number,
    pageNumber: number
  ): Promise<RandomUser[]> {
    if (this.pageUsers.has(pageNumber)) return this.pageUsers.get(pageNumber)!;

    const users = await this.httpClient
      .get<RandomUsers>(
        `https://randomuser.me/api/?page=${pageNumber}&results=${itemsPerPage}`
      )
      .toPromise();
    console.log({ users });

    this.pageUsers.set(pageNumber, users.results);
    return users.results;
  }
}
