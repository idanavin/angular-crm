import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { users as dataUsers } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _users: User[];

  constructor() {
    this._users = dataUsers
  }

  get getUsers(): User[] {
    return this._users;
  }

  getUserByEmail(email: string): User | undefined {
    let returnUser;
    this._users.map((user: User) => {
      if (user.email === email) {
        returnUser = user;
      }
    })
    return returnUser;
  }

  set insertUser(user: User) {
    this._users.push(user);
  }

  // set setTokenOnUser(accessToken: string) {
  //   //Very secured :)
  //   const token = `${userEmail}-1234abcd`;
  //   this._users.map((user: User) => {
  //     if (user.email === userEmail) {
  //       user.token = token
  //       localStorage.setItem('userEmail', user.email)
  //       localStorage.setItem('credentials', token);
  //     }
  //   })
  // }

  getUserByToken(localToken: string): User | undefined {
    return this._users.find((user) => user.token === localToken)
  }

  removeToken(localToken: string) {
    this._users.map((user: User) => {
      if (user.token === localToken) user.token = null;
    })
  }
}
