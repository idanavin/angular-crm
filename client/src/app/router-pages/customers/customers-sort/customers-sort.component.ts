import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-customers-sort',
  templateUrl: './customers-sort.component.html',
  styleUrls: ['./customers-sort.component.scss']
})
export class CustomersSortComponent {

  @Output() private sortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();
  // didSortChanged: boolean = false

  constructor() { }

  changeSort(sort: Sort) {
    this.sortChanged.emit(sort)
  }

}
