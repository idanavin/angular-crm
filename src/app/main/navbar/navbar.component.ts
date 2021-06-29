import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

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

  logout() {
    this.authService.logout();
  }

}
