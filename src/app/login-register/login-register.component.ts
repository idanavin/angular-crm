import { Component, OnInit } from '@angular/core';
import { loginSlider } from '../animations';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
  animations: [loginSlider]
})
export class LoginRegisterComponent implements OnInit {

  login: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchLoginRegister() {
    this.login = !this.login
  }

}
