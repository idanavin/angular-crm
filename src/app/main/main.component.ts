import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from '../interface/user';
import { AuthService } from '../services/auth.service';
import { slider } from './router-animations'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [slider]
})
export class MainComponent implements OnInit {

  user: User | undefined;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authSuccess$.subscribe(user => { this.user = user })
    this.isLogged()
  }

  isLogged() {
    const user = this.authService.getUserForLocalToken()

    if (user) {
      this.user = user;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
