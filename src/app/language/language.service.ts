import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService) { }

  changeLanguage(language: string): void {
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
  }
}
