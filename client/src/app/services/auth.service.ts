import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interface/user';
import { DataService } from './data.service';
import { server } from '../../../.env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _successfulAuth = new Subject<User>();
  authSuccess$ = this._successfulAuth.asObservable();

  constructor(
    private dataService: DataService,
    private readonly httpClient: HttpClient
  ) {}

  async login(formValues: { username: string; password: string }) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    const result = await this.httpClient
      .post<string>(server.IP + 'auth', formValues, {
        headers: headers,
      })
      .toPromise();

    if (result) {
      this.setAccessToken(result);
    }
  }

  setAccessToken(accessToken: string) {
    console.log(accessToken);
  }

  private setToken(user: User) {
    this.dataService.setTokenOnUser = user.email;
    this._successfulAuth.next(user);
  }

  getLocalToken(): string | null {
    return localStorage.getItem('credentials');
  }

  getUserForLocalToken(): User | undefined {
    let user;
    const localToken = this.getLocalToken();
    if (localToken) {
      user = this.dataService.getUserByToken(localToken);
    }
    return user;
  }

  logout() {
    const localToken = this.getLocalToken();
    if (localToken) {
      localStorage.clear();
      this.dataService.removeToken(localToken);
    }
    this._successfulAuth.next(undefined);
  }
}
