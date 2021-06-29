import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { costumers } from '../data/data';
import { RandomUser, RandomUsers } from '../domain-layer/entities/random-users';

@Injectable({
  providedIn: 'root',
})
export class CostumersService {
  private _costumers: RandomUser[] = [];

  readonly pageUsers: Map<number, RandomUser[]> = new Map<
    number,
    RandomUser[]
  >();

  constructor(private readonly httpClient: HttpClient) {
  }

  get getCostumersLength(): number {
    return this._costumers.length;
  }

  getCostumersByPage(itemsPerPage: number, page: number): Promise<RandomUser[]> {
    const lastIndex = itemsPerPage * (page + 1);
    const firstIndex = lastIndex - itemsPerPage;

    if (lastIndex <= this._costumers.length) {
      return this.getLocalCostumers(firstIndex, lastIndex);
    } else {
      const newUsers = this.loadRandomUsers(itemsPerPage)
      return newUsers
    }
  }

  private async getLocalCostumers(firstIndex: number, lastIndex: number): Promise<RandomUser[]> {
    return this._costumers.slice(firstIndex, lastIndex);
  }

  async loadRandomUsers(itemsPerPage: number): Promise<RandomUser[]> {
    const pageNumber = 1;
    const users = await this.httpClient
      .get<RandomUsers>(
        `https://randomuser.me/api/?page=${pageNumber}&results=${itemsPerPage}`
      )
      .toPromise();

    this._costumers.push(...users.results);
    this.saveToLocalstorage();
    return users.results
  }

  private saveToLocalstorage(): void {
    localStorage.setItem('costumers', JSON.stringify(this._costumers));
  }

  loadLocalstorage(): void {
    const costumers = localStorage.getItem('costumers')
    if (costumers) this._costumers = JSON.parse(costumers) as RandomUser[]
  }
}
