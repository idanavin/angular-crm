import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-alt',
  templateUrl: './custom-alt.component.html',
  styleUrls: ['./custom-alt.component.scss']
})
export class CustomAltComponent implements OnInit {

  @Input() altText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
