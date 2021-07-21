import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Purchased, RandomUser, RandomUsers } from '../domain-layer/entities/random-users';
import { PurchaseService } from './purchase.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {

  usersToEdit?: RandomUser[]
  users: Map<string, RandomUser[]> = new Map<
    string,
    RandomUser[]
  >();

  constructor(private readonly httpClient: HttpClient, private purchaseService: PurchaseService) {
    this.users.set('unsorted', [])
  }

  get UnsortedUsers(): RandomUser[] {
    return this.users.get('unsorted')!
  }

  getCustomersByPage(itemsPerPage: number, page: number, order: Sort): Promise<RandomUser[]> {
    const lastIndex = itemsPerPage * (page + 1);
    const firstIndex = lastIndex - itemsPerPage;
    const list: RandomUser[] = this._getListInOrder(order);

    if (lastIndex <= list.length) {
      return this.getLocalCustomers(firstIndex, lastIndex, list);
    }
    return this._loadRandomUsers(itemsPerPage)
  }

  private async getLocalCustomers(firstIndex: number, lastIndex: number, users: RandomUser[]): Promise<RandomUser[]> {
    return users.slice(firstIndex, lastIndex);
  }

  private async _loadRandomUsers(itemsPerPage: number): Promise<RandomUser[]> {
    const pageNumber = 1;
    const users = await this.httpClient
      .get<RandomUsers>(
        `https://randomuser.me/api/?page=${pageNumber}&results=${itemsPerPage}`
      )
      .toPromise();
    this._makeRandomPurchases(users.results);
    this.users.set('unsorted', [... this.users.get('unsorted')!, ...users.results])
    this._saveToLocalstorage();
    return users.results
  }

  private _makeRandomPurchases(users: RandomUser[]) {
    users.forEach(user => this.purchaseService.setCustomerRandomPurchase(user))
  }

  private _getListInOrder(sortOrder: Sort): RandomUser[] {
    sortOrder = this._changeSortDirectionIfUnsorted(sortOrder)
    this._sortIfNotExist(sortOrder);
    return this.users.get(`${sortOrder.active}${sortOrder.direction}`)!
  }

  private _sortIfNotExist(sortOrder: Sort): void {
    if (!this.users.has(`${sortOrder.active}${sortOrder.direction}`)) {
      this._sortUsers(sortOrder)
    }
  }

  private _changeSortDirectionIfUnsorted(sort: Sort): Sort {
    if (sort.active === "unsorted") {
      sort.direction = "";
    }
    return sort
  }

  private _saveToLocalstorage(): void {
    localStorage.setItem(`customers`, JSON.stringify(this.users.get('unsorted')))
  }

  public loadLocalstorage(): void {
    const customers = localStorage.getItem('customers')
    if (customers) this.users.set('unsorted', JSON.parse(customers) as RandomUser[])
  }

  private _sortUsers(sort: Sort): void {
    const { active, direction } = sort
    const unorderedList: RandomUser[] = this.users.get('unsorted')!;
    
    this.users.set(`${active}${direction}`, [...unorderedList].sort((userA, userB) => {
      if (direction === 'asc') return this._sortByType(userA, userB, sort.active);
      else return this._sortByType(userB, userA, sort.active);
    }))
  }

  private _sortByType(userA: RandomUser, userB: RandomUser, sortType: string) {
    if (sortType === 'age') return userA.dob.age - userB.dob.age
    else return (userA.name.last > userB.name.last) ? 1 : ((userB.name.last > userA.name.last) ? -1 : 0)
  }

  addNewCustomers(customer: RandomUser): void {
    const customers: RandomUser[] = [customer, ...this.users.get('unsorted')!];
    this.resetUsersWithUnsorted(customers)
  }

  resetUsersWithUnsorted(customers: RandomUser[]) {
    this.users.clear();
    this.users.set('unsorted', customers);
    this._saveToLocalstorage();
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

  getUnsortedPurchasedList(): Purchased[] {
    let purchasedList: Purchased[] = [];
    const unsortedUsersList = this.users.get('unsorted');

    unsortedUsersList?.forEach((user) => {
      user.purchased?.forEach((purchased) => purchasedList.push(purchased))
    })
    return purchasedList
  }

  sortListByDate(purchased: Purchased[]) {
    return purchased.sort(function(purchasedA, purchasedB){
      return (purchasedA.date > purchasedB.date) ? -1 : (purchasedB.date > purchasedA.date) ? 1 : 0;
    });
  }
}
