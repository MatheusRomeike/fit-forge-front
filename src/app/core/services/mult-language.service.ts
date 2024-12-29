import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
import { effect, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MultiLanguageService {
  public languages = ['pt', 'en'];
  private languageKey = 'languageSignal';

  get defaultLanguage() {
    let browserLang = navigator.language.split('-')[0];
    if (!this.languages.includes(browserLang)) {
      browserLang = 'en';
    }
    return browserLang;
  }

  languageSignal = signal<string>(
    window.localStorage.getItem(this.languageKey) ?? this.defaultLanguage
  );

  updateLanguage(language: string): void {
    this.languageSignal.update(() => {
      switch (language) {
        case 'en':
          return 'en';
        case 'pt':
          return 'pt';
        default:
          return this.defaultLanguage;
      }
    });
  }

  constructor(private translateService: TranslateService) {
    effect(() => {
      window.localStorage.setItem(this.languageKey, this.languageSignal());
      this.translateService.use(this.languageSignal());
      this.changeLocale(this.languageSignal());
    });
  }

  private changeLocale(language: string): void {
    console.log(language);
    if (language === 'pt') {
      registerLocaleData(localePt);
    } else if (language === 'en') {
      registerLocaleData(localeEn);
    }
  }
}
