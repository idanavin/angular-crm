import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
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
    this.users.set('unsorted', [])
  }

  getCostumersByPage(itemsPerPage: number, page: number, order: Sort): Promise<RandomUser[]> {
    const lastIndex = itemsPerPage * (page + 1);
    const firstIndex = lastIndex - itemsPerPage;
    
    //! BUG on unsorted if direction changed, when moving pages it loading new random users
    if (!this.users.has(`${order.active}${order.direction}`)) this.sortUsers(order)
    let list: RandomUser[] = this.users.get(`${order.active}${order.direction}`)!;

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

    this.users.set('unsorted', [... this.users.get('unsorted')!, ...users.results])
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
    const unorderedList: RandomUser[] = this.users.get('unsorted')!;
    
    this.users.set(`${active}${direction}`, [...unorderedList].sort((userA, userB) => {
      if (direction === 'asc') return this.sortByType(userA, userB, sort.active);
      else return this.sortByType(userB, userA, sort.active);
    }))
  }

  sortByType(userA: RandomUser, userB: RandomUser, sortType: string) {
    if (sortType === 'age') return userA.dob.age - userB.dob.age
    else return (userA.name.last > userB.name.last) ? 1 : ((userB.name.last > userA.name.last) ? -1 : 0)
  }

  addNewCostumer(costumer: RandomUser): void {
    const costumers: RandomUser[] = [costumer, ...this.users.get('unsorted')!];
    this.users = new Map<string, RandomUser[]>();
    this.users.set('unsorted', costumers);
    this.saveToLocalstorage();
  }
}
