import { effect, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MultiLanguageService {
  public languages = ['pt', 'en'];
  public defaultLanguage = 'en';
  private languageKey = 'languageSignal';

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
          return 'en';
      }
    });
  }

  constructor(private translateService: TranslateService) {
    effect(() => {
      window.localStorage.setItem(this.languageKey, this.languageSignal());
      this.translateService.use(this.languageSignal());
    });
  }
}
