import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { RandomUser, RandomUsers } from '../domain-layer/entities/random-users';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {

  usersToEdit?: RandomUser[]
  users: Map<string, RandomUser[]> = new Map<
    string,
    RandomUser[]
  >();

  constructor(private readonly httpClient: HttpClient) {
    this.users.set('unsorted', [])
  }

  getCustomersByPage(itemsPerPage: number, page: number, order: Sort): Promise<RandomUser[]> {
    const lastIndex = itemsPerPage * (page + 1);
    const firstIndex = lastIndex - itemsPerPage;
    
    //! BUG on unsorted if direction changed, when moving pages it loading new random users
    if (!this.users.has(`${order.active}${order.direction}`)) this.sortUsers(order)
    let list: RandomUser[] = this.users.get(`${order.active}${order.direction}`)!;

    if (lastIndex <= list.length) {
      return this.getLocalCustomers(firstIndex, lastIndex, list);
    } else {
      return this.loadRandomUsers(itemsPerPage)
    }
  }

  private async getLocalCustomers(firstIndex: number, lastIndex: number, users: RandomUser[]): Promise<RandomUser[]> {
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
    localStorage.setItem(`customers`, JSON.stringify(this.users.get('unsorted')))
  }

  loadLocalstorage(): void {
    const customers = localStorage.getItem('customers')
    if (customers) this.users.set('unsorted', JSON.parse(customers) as RandomUser[])
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
    const customers: RandomUser[] = [costumer, ...this.users.get('unsorted')!];
    this.resetUsersWithUnsorted(customers)
  }

  resetUsersWithUnsorted(customers: RandomUser[]) {
    this.users = new Map<string, RandomUser[]>();
    this.users.set('unsorted', customers);
    this.saveToLocalstorage();
  }

  setCustomersToEdit(customers: RandomUser[]): void {
    this.usersToEdit = customers;
  }

  customersToEdit(): RandomUser[] {
    return this.usersToEdit!
  }

  findAndReplaceEdited(editedCustomers: RandomUser[]): void {
    let unsortedUsers = this.users.get('unsorted')!;
    this.usersToEdit?.forEach((costumer, index) => {
      const indexToEdit = unsortedUsers.findIndex((unsortedCostumer) => {
        return unsortedCostumer.id.value === costumer.id.value
      })
      unsortedUsers[indexToEdit] = editedCustomers[index];
    })
    this.resetUsersWithUnsorted(unsortedUsers);
  }

  removeCustomers(customers: RandomUser[]): void {
    let unsortedUsers = this.users.get('unsorted')!;
    customers.map((costumerToRemove) => {
      unsortedUsers = unsortedUsers.filter((costumerInMemory) => costumerInMemory != costumerToRemove)
    })
    this.resetUsersWithUnsorted(unsortedUsers)
  }
}
