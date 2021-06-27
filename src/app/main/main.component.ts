import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: User | undefined;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authSuccess$.subscribe(user => {this.user = user})
    this.isLogged()
  }

  isLogged() {
    const user = this.authService.getUserForLocalToken()

    if (user) {
      this.user = user;
    }
  }

}
