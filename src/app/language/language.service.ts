import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService, @Inject(DOCUMENT) private document: Document) { }

  changeLanguage(language: string): void {
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
    this.changeHtmlDirection(language);
    this.changeClassForBody(language);
    localStorage.setItem('lang', language);
  }

  setDefaultLanguage(): void {
    const localLanguage = localStorage.getItem('lang')
    localLanguage ? this.changeLanguage(localLanguage) : this.changeLanguage('en')
  }

  changeHtmlDirection(language: string) {
    const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = language === "he" ? "rtl" : "ltr";
  }

  changeClassForBody(language: string) {
    const dir = language === "he" ? "rtl" : "ltr";
    const bodyTag = this.document.getElementsByTagName("body")[0] as HTMLBodyElement;
    bodyTag.classList.remove(...['ltr', 'rtl'])
    bodyTag.classList.add(dir);
  }
}
