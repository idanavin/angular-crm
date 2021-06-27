import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interface/user';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _successfulAuth = new Subject<User>();
  authSuccess$ = this._successfulAuth.asObservable();

  constructor(private dataService: DataService) { }
  
  login(formValues: { email: string, password: string }) {
    const { email, password } = formValues;
    return new Promise ((resolve, reject) => {
      let resolved = false
      setTimeout(() => {
        this.dataService.getUsers.map((user: User) => {
          if (user.email === email && user.password === password) {
            this.setToken(user);
            resolve(true)
            resolved = true
          }
        })
        if (!resolved) reject()
      }, 2500)
    })
  }

  private setToken(user: User) {
    this.dataService.setTokenOnUser = user.email;
    this._successfulAuth.next(user);
  }

  getLocalToken(): string | null  {
    return localStorage.getItem('credentials')
  }

  getUserForLocalToken(): User | undefined {
    let user;
    const localToken = this.getLocalToken();
    if (localToken) {
      user = this.dataService.checkToken(localToken)
    }
    return user
  }

  logout() {
    const localToken = this.getLocalToken();
    if (localToken) {
      localStorage.clear();
      this.dataService.removeToken(localToken)
    }
    this._successfulAuth.next(undefined);
  }

}
