import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LanguageService } from 'src/app/language/language.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isChecked: boolean = false;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  toggleTheme($event: MatSlideToggleChange): void {
    this.themeService.toggleTheme($event);
  }

  changeLanguage(language: string): void {
    this.languageService.changeLanguage(language);
  }
}
