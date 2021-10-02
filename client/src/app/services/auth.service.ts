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

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  async login(formValues: { username: string; password: string }) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    const result = await this.httpClient
      .post<{ 'access_token': string }>(server.IP + 'auth', formValues, {
        headers: headers,
      })
      .toPromise();

    if (result) {
      this.setAccessToken(result.access_token);
    }
  }

  getUserForLocalToken(): string | null {
    const localToken = this.getLocalToken();
    if (!localToken) {
      return null;
    }
    
    return localToken;
  }
  
  logout() {
    const localToken = this.getLocalToken();
    if (localToken) {
      localStorage.removeItem('access_token');
    }
    this._successfulAuth.next(false);
  }
  
  private setAccessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
    this._successfulAuth.next(true);
  }

  private getLocalToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
