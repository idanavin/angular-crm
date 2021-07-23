import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Purchased } from 'src/app/domain-layer/entities/random-users';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Purchased[];

  constructor(private readonly purchaseService: PurchaseService) { 
    this.orders = this.purchaseService.getOrderList();
  }

  ngOnInit(): void {
    
  }

  onSelections(selected: MatListOption[]) {

  }

}
