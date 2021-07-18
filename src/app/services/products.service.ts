import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RandomProduct } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products?: RandomProduct[];

  constructor(private httpClient: HttpClient) {}

  async getProducts(amount: number): Promise<RandomProduct[]> {
    if (!this.products) {
      return await this._getAmountOfProducts(amount).then(
        (products) => {
          this.products = products
          return products
        }
      );
    }
    return this.products
  }

  private async _getAmountOfProducts(amount: number = 20): Promise<RandomProduct[]> {
    const products = await this.httpClient
      .get<RandomProduct[]>(`https://fakestoreapi.com/products?limit=${amount}`)
      .toPromise();
    return products;
  }
}
