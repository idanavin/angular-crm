import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: Subject<string> = new Subject<string>();
  theme$ = this.theme.asObservable();

  constructor() {
    const storageTheme = localStorage.getItem('theme');
    if (storageTheme) {
      this.theme.next(storageTheme);
    }
  }

  changeTheme(theme: string) {
    this.theme.next(theme);
    localStorage.setItem('theme', theme);
  }
}
