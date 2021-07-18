import { Component, Input, OnInit } from '@angular/core';
import { RandomProduct } from 'src/app/interface/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @Input() products!: Promise<RandomProduct[]>

  constructor() { }

  ngOnInit(): void {
  }

}
