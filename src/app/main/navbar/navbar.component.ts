import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LanguageService } from 'src/app/language/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // @Output()
  // themeEvent: EventEmitter<string> = new EventEmitter<string>();
  isChecked: boolean = false;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
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

  logout() {
    this.authService.logout();
  }

  toggleTheme($event: MatSlideToggleChange): void {
    this.isChecked = $event.checked;
    const mode = this.isChecked ? 'dark' : 'light';
    this.setTheme(mode);
    // this.themeEvent.emit(mode);
    localStorage.setItem('theme', mode);
  }

  changeLanguage(language: string): void {
    this.languageService.changeLanguage(language);
  }
}
