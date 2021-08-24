import { Injectable } from '@angular/core';
import {
  Id,
  Purchased,
  RandomUser,
} from '../domain-layer/entities/random-users';
import { RandomProduct } from '../interface/product';
import { LocalSaveService } from './local-save.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  purchasableIds: number[] = [];
  purchaseHistory: Purchased[];

  constructor(
    private readonly productsService: ProductsService,
    private localSaveService: LocalSaveService
  ) {
    this.purchaseHistory = this.localSaveService.loadPurchaseHistory();
  }

  async getPurchasableIds(): Promise<number[]> {
    return await this.productsService.getPurchasableIds().then((ids) => ids);
  }

  setPurchaseableIds(products: RandomProduct[]) {
    this.purchasableIds = products.map((product) => product.id)
  }

  async setCustomerRandomPurchase(customer: RandomUser) {
    if (this.purchasableIds.length === 0) {
      this.purchasableIds = await this.getPurchasableIds();
    }
    const randomAmountOfPurchases = Math.floor(Math.random() * 10);
    customer.purchased = [];
    for (let i = 0; i < randomAmountOfPurchases; i++) {
      const randomPurchase = this._getRandomPurchase(customer.email);
      this._makeAPurchase(customer, randomPurchase);
    }
  }

  private _makeAPurchase(
    customer: RandomUser,
    purchasedObject: Purchased
  ): void {
    customer.purchased?.push(purchasedObject);
    this.productsService.increasePurchaseCounter(purchasedObject.product_id);
  }

  private _getRandomPurchase(customerEmail: string): Purchased {
    const randomIndex = Math.floor(Math.random() * this.purchasableIds.length);
    const productId = this.purchasableIds[randomIndex];
    const price = this.productsService.getProductPrice(productId);

    return {
      customer_email: customerEmail,
      product_id: productId,
      date: this._getRandomDate(),
      total_cost: price ? price : '',
    };
  }

  private _getRandomDate(): Date {
    const date = new Date();
    const nowDay = date.getDay();
    const nowMonth = date.getMonth();
    const randomPastDay = Math.floor(Math.random() * nowDay);
    const randomPastMonth = Math.floor(Math.random() * nowMonth);
    date.setDate(randomPastDay ? randomPastDay : 1);
    date.setMonth(randomPastMonth ? randomPastMonth : 1);
    return date;
  }

  getOrderList(): Purchased[] {
    if (this.purchaseHistory === []) {
      this.purchaseHistory = this.localSaveService.loadPurchaseHistory();
    }
    return this.purchaseHistory
  }

  saveToPurchaseHistory(users: RandomUser[]) {
    const unsortedPurchasedList = this._getPurchaseList(users);
    this.purchaseHistory?.push(...unsortedPurchasedList);
    this.purchaseHistory = this._sortListByDate(this.purchaseHistory);
    this.localSaveService.saveToLocal('purchaseHistory', this.purchaseHistory);
  }

  private _getPurchaseList(users: RandomUser[]): Purchased[] {
    const purchasedList: Purchased[] = users.reduce((acc: Purchased[], curr) => {
      curr.purchased && acc.push(...curr.purchased);
      return acc;
    }, []);

    // users.forEach((user) => {
    //   purchasedList.push(...user.purchased!);
    // });
    return purchasedList;
  }

  private _sortListByDate(purchased: Purchased[]): Purchased[] {
    return purchased.sort((purchasedA, purchasedB) => {
      return purchasedA.date > purchasedB.date
        ? -1
        : purchasedB.date > purchasedA.date
        ? 1
        : 0;
    });
  }
}
