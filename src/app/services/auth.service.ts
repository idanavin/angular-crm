import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: any[] = [{
    name: 'Yosi',
    email: 'test@test.com',
    password: '123456',
    age: 26,
    credentials: 'test@test.com-1234abcd'
  },
  {
    email: 'test2@test.com',
    password: '123456'
  },
  {
    email: 'test1@test.com',
    password: '123456'
  }]


  private _successfulAuth = new Subject<boolean>();
  authSuccess$ = this._successfulAuth.asObservable();

  constructor() { }
  
  login(formValues: { email: string, password: string }) {
    
    const { email, password } = formValues;

    let success = false;

    this.users.map((user) => {
      if (user.email === email && user.password === password) {
        this.setToken(email);
        success = true
      }
    })
    if (!success) throw 'Email or password is wrong';
  }

  private setToken(param: string) {
    localStorage.setItem('credentials', `${param}-1234abcd`);
    this._successfulAuth.next(true);
  }

  getToken() {
    return localStorage.getItem('credentials')
  }

  checkMatchingCredentials() {
    const creds = this.getToken();
    let returnUser = null;
    if (creds) {
      this.users.map(user => {
        if (user.credentials === creds) {
          returnUser = user
        }
      })
    }
    return returnUser
  }

  logout() {
    localStorage.clear();
    this._successfulAuth.next(false);
  }

}
