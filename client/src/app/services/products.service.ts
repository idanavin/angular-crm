import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RandomProduct } from '../interface/product';
import { LocalSaveService } from './local-save.service';
import { products as localProducts} from '../data/data'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products?: RandomProduct[];
  categories: string[];

  constructor(
    private httpClient: HttpClient,
    private localSaveService: LocalSaveService
  ) {
    this.categories = this.localSaveService.loadCategories();
  }

  async getProductsAndCategories(amountOfProducts: number = 20) {
    const products = await this.getProducts(amountOfProducts);
    return [products, this.categories];
  }

  async getProducts(amount: number = 20): Promise<RandomProduct[]> {
    this.loadProducts();
    if (!this.products) {
      await this._setProducts(amount);
    }
    return this.products!;
  }

  private async _setProducts(amount: number = 20) {
    try {
      const products = await this._getAmountOfProducts(amount);
      this.products = products;
    } catch (error) {
      console.log(`couldn't get online products, getting from data`);
      console.log(error);
      this.products = localProducts;
    }
    this.setCategories(this.products!);
    this.localSaveService.saveToLocal('products', this.products!);
  }

  async getPurchasableIds(): Promise<number[]> {
    if (!this.products) {
      await this._setProducts();
    }
    return this.products?.map((product) => product.id)!;
  }

  getProductPrice(productId: number): string {
    const product = this.products?.find((product) => product.id === productId);
    try {
      return product!.price;
    } catch {
      throw product;
    }
  }

  loadProducts() {
    const products = this.localSaveService.loadProducts();
    if (products) {
      this.products = products;
    }
  }

  setCategories(products: RandomProduct[]) {
    products.map((product) => {
      const category = this.categories?.find(
        (category) => category === product.category
      );
      if (!category) {
        this.categories.push(product.category);
      }
    });
    this.localSaveService.saveToLocal('product_categories', this.categories);
  }

  private async _getAmountOfProducts(
    amount: number = 20
  ): Promise<RandomProduct[]> {
    const products = await this.httpClient
      .get<RandomProduct[]>(`https://fakestoreapi.com/products?limit=${amount}`)
      .toPromise();
    products.forEach((product) => (product.purchased = 0));
    return products;
  }

  increasePurchaseCounter(productId: number) {
    const product = this.products?.find((product) => product.id === productId);
    if (product) {
      product.purchased! += 1;
    }
  }
}
