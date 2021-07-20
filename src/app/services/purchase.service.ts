import { Injectable } from '@angular/core';
import { range } from 'rxjs';
import { Purchased, RandomUser } from '../domain-layer/entities/random-users';
import { RandomProduct } from '../interface/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  purchasableIds: number[] = [];

  constructor(private readonly productsService: ProductsService) {}

  async getPurchasableIds(): Promise<number[]> {
    return await this.productsService
      .getPurchasableIds()
      .then((ids) => ids);
  }

  async setCustomerRandomPurchase(customer: RandomUser) {
    if (this.purchasableIds.length === 0) {
      this.purchasableIds = await this.getPurchasableIds();
    }
    const randomAmountOfPurchases = Math.floor(Math.random() * 10)
    customer.purchased = []
    for (let i = 0; i < randomAmountOfPurchases; i++) {
      const randomPurchase = this._getRandomPurchase()
      this._makeAPurchase(customer, randomPurchase);
    }
  }

  private _makeAPurchase(customer: RandomUser, purchasedObject: Purchased): void {
    customer.purchased?.push(purchasedObject)
    this.productsService.increasePurchaseCounter(purchasedObject.id);
  }

  private _getRandomPurchase(): Purchased {
    const randomIndex = Math.floor(Math.random() * this.purchasableIds.length);
    const productId = this.purchasableIds[randomIndex];
    const price = this.productsService.getProductPrice(productId);
    
    return {
      id: productId,
      date: this.getRandomDate(),
      total_cost: price ? price : '',
    };
  }

  getRandomDate(): Date {
    const date = new Date();
    const nowDay = date.getDay();
    const nowMonth = date.getMonth();
    const randomPastDay = Math.floor(Math.random() * nowDay);
    const randomPastMonth = Math.floor(Math.random() * nowMonth);
    date.setDate(randomPastDay ? randomPastDay : 1);
    date.setMonth(randomPastMonth? randomPastMonth : 1);
    return date;
  }
}
