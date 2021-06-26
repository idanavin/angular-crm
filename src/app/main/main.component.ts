import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: any;
  @Input() isAuth: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authSuccess$.subscribe(bool => {this.isAuth = bool})
    this.isLogged()
  }

  isLogged() {
    const user = this.authService.checkMatchingCredentials()

    if (user) {
      this.isAuth = true;
      this.user = user;
    }
  }

}
