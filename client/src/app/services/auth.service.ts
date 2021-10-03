import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { server } from '../../../.env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _successfulAuth = new Subject<boolean>();
  authSuccess$ = this._successfulAuth.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  async login(formValues: { username: string; password: string }) {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const result = await this.httpClient
        .post<{ access_token: string }>(server.IP + 'auth', formValues, {
          headers: headers,
        })
        .toPromise();

      if (result) {
        this.setAccessToken(result.access_token);
      }
    } catch (error) {
      //!Need to display error message
      if (error.status === 404) {
        console.log('Cant find username');
      }
      if (error.status === 401) {
        console.log('Incorrect password');
      }
    }
  }

  async getUserForLocalToken(): Promise<string | null> {
    const localToken = this.getLocalToken();
    if (!localToken) {
      return null;
    }
    const isLogged = await this.checkServerIsLogged(localToken);

    return isLogged ? localToken : null;
  }

  logout() {
    const localToken = this.getLocalToken();
    if (localToken) {
      localStorage.removeItem('access_token');
    }
    this._successfulAuth.next(false);
  }

  private async checkServerIsLogged(
    localToken: string
  ): Promise<boolean | undefined> {
    try {
      const isLogged = await this.httpClient
        .get<boolean>(server.IP + 'auth', {
          headers: new HttpHeaders({
            Authorization: localToken,
          }),
        })
        .toPromise();

      if (!isLogged) {
        this.logout();
      }
      return isLogged;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  private setAccessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
    this._successfulAuth.next(true);
  }

  private getLocalToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
