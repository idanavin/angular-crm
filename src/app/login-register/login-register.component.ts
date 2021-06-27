import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
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
