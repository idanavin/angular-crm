import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { costumers } from '../data/data';
import { RandomUser, RandomUsers } from '../domain-layer/entities/random-users';

@Injectable({
  providedIn: 'root',
})
export class CostumersService {

  users: Map<string, RandomUser[]> = new Map<
    string,
    RandomUser[]
  >();

  constructor(private readonly httpClient: HttpClient) {
    this.users.set('unsorted-', [])
  }

  getCostumersByPage(itemsPerPage: number, page: number, order: Sort): Promise<RandomUser[]> {
    const lastIndex = itemsPerPage * (page + 1);
    const firstIndex = lastIndex - itemsPerPage;

    if (!this.users.has(`${order.active}-${order.direction}`)) this.sortUsers(order)
    let list: RandomUser[] = this.users.get(`${order.active}-${order.direction}`)!;

    if (lastIndex <= list.length) {
      return this.getLocalCostumers(firstIndex, lastIndex, list);
    } else {
      return this.loadRandomUsers(itemsPerPage)
    }
  }

  private async getLocalCostumers(firstIndex: number, lastIndex: number, users: RandomUser[]): Promise<RandomUser[]> {
    return users.slice(firstIndex, lastIndex);
  }

  private async loadRandomUsers(itemsPerPage: number): Promise<RandomUser[]> {
    const pageNumber = 1;
    const users = await this.httpClient
      .get<RandomUsers>(
        `https://randomuser.me/api/?page=${pageNumber}&results=${itemsPerPage}`
      )
      .toPromise();

    this.users.set('unsorted-', [... this.users.get('unsorted-')!, ...users.results])
    this.saveToLocalstorage();
    return users.results
  }

  private saveToLocalstorage(): void {
    localStorage.setItem(`costumers`, JSON.stringify(this.users.get('unsorted')))
  }

  loadLocalstorage(): void {
    const costumers = localStorage.getItem('costumers')
    if (costumers) this.users.set('unsorted', JSON.parse(costumers) as RandomUser[])
  }

  private sortUsers(sort: Sort): void {
    const { active, direction } = sort
    const unorderedList: RandomUser[] = this.users.get('unsorted-')!;
    
    this.users.set(`${active}-${direction}`, [...unorderedList].sort((userA, userB) => {
      if (direction === 'asc') return userA.dob.age - userB.dob.age
      else return userB.dob.age - userA.dob.age
    }))
  }
}
