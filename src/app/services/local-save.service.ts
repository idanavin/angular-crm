import { Injectable } from '@angular/core';
import { Purchased, RandomUser } from '../domain-layer/entities/random-users';
import { RandomProduct } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class LocalSaveService {
  constructor() {}

  loadCustomers(): RandomUser[] | null {
    const customers = this.loadFromLocal('customers');
    if (customers) {
      return JSON.parse(customers) as RandomUser[];
    }
    return null;
  }

  loadProducts(): RandomProduct[] | null {
    const products = this.loadFromLocal('products');
    if (products) {
      return JSON.parse(products) as RandomProduct[];
    }
    return null;
  }

  loadCategories(): string[] {
    const categories = this.loadFromLocal('product_categories');
    if (categories) {
      return JSON.parse(categories);
    }
    return [];
  }

  loadPurchaseHistory(): Purchased[] {
    const purchaseHistory = this.loadFromLocal('purchaseHistory');
    if (purchaseHistory) {
      return JSON.parse(purchaseHistory)
    }
    return [];
  }

  loadFromLocal(localName: string) {
    return localStorage.getItem(localName);
  }

  saveToLocal(localName: string, arrayOfData: any[]): void {
    localStorage.setItem(localName, JSON.stringify(arrayOfData));
  }
}
