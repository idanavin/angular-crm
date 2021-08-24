import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isChecked: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  setDefaultTheme() {
    const storageTheme = localStorage.getItem('theme');
    if (storageTheme) {
      // this.themeEvent.emit(storageTheme);
      this.setTheme(storageTheme)
      this.isChecked = storageTheme === 'dark';
    } else {
      this.setTheme('light');
    }
  }

  setTheme(themeName: string) {
    const bodyTag = this.document.getElementsByTagName("body")[0] as HTMLBodyElement;
    const bodyClassList = bodyTag.classList;
    bodyClassList.remove('dark');
    bodyClassList.remove('light');
    bodyClassList.add(themeName);
  }

  toggleTheme(isChecked: MatSlideToggleChange): void {
    this.isChecked = isChecked.checked;
    const mode = this.isChecked ? 'dark' : 'light';
    this.setTheme(mode);
    localStorage.setItem('theme', mode);
  }
}
