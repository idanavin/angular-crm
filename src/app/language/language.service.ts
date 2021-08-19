import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService, @Inject(DOCUMENT) private document: Document) { }

  changeLanguage(language: string): void {
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = language === "he" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
    localStorage.setItem('lang', language);
  }

  setDefaultLanguage(): void {
    const localLanguage = localStorage.getItem('lang')
    localLanguage ? this.changeLanguage(localLanguage) : this.changeLanguage('en')
  }
}
