import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { RandomProduct } from 'src/app/interface/product';
import { CrmFormsService } from 'src/app/services/crm-forms.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categoryFormGroup: FormGroup;
  categoryFormControl: FormControl = new FormControl();
  categories: string[] = [];
  products: Promise<RandomProduct[]>;
  selected: MatListOption[] = [];

  constructor(private readonly productsService: ProductsService, private crmFormService: CrmFormsService) { 
    this.products = this.productsService.getProducts(20);
    this.categories = this.productsService.categories;
    this.categoryFormGroup = this.crmFormService.getProductCategoryForm();
  }

  ngOnInit(): void {
  }

  onSelections(products: MatListOption[]): void {
    this.selected = products;
  }

}
