import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { RandomProduct } from 'src/app/interface/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Promise<RandomProduct[]>;
  selected: MatListOption[] = [];

  constructor(private readonly productsService: ProductsService) { 
    this.products = this.productsService.getProducts(20);
  }

  ngOnInit(): void {
  }

  onSelections(products: MatListOption[]): void {
    this.selected = products;
  }

}
