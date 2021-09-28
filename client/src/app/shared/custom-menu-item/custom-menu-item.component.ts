import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-menu-item',
  templateUrl: './custom-menu-item.component.html',
  styleUrls: ['./custom-menu-item.component.scss']
})
export class CustomMenuItemComponent implements OnInit {
  @Input() icon!: string;
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
