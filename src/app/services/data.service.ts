import { Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _users: User[] = [{
    id: 1,
    image: '../../assets/avatar0.png',
    firstName: 'Larsen',
    lastName: 'Show',
    email: 'test@test.com',
    password: '123456',
    age: 26,
    token: null
  },
  {
    id: 2,
    firstName: 'Rosseta',
    lastName: 'Wilson',
    email: 'test1@test.com',
    password: '123456',
    age: 18,
    token: null
  },
  {
    id: 3,
    firstName: 'William',
    lastName: 'Carney',
    email: 'test3@test.com',
    password: '123456',
    age: 44,
    token: null
  }]

  constructor() { }

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

  set setTokenOnUser(userEmail: string) {
    //Very secured :)
    const token = `${userEmail}-1234abcd`;
    this._users.map((user: User) => {
      if (user.email === userEmail) {
          user.token = token
          localStorage.setItem('userEmail', user.email)
          localStorage.setItem('credentials', token);
        } 
      })
  }

  checkToken(localToken: string): User | null {
    let returnUser = null;
    this._users.map((user: User) => {
      if(user.token = localToken) returnUser = user
    })
    return returnUser;
  }

  removeToken(localToken: string) {
    this._users.map((user: User) => {
      if(user.token = localToken) user.token = null;
    })
  }
}
