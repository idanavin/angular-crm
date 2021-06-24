import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  //Unhide app-custom-alt as first child
  //TODO refactor this
  showTooltip(event: any) {
    event.target.firstChild.hidden = false;
  }

  hideTooltip(event: any) {
    event.target.firstChild.hidden = true;
  }

}
