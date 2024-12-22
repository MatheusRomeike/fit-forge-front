import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MultiLanguageService } from './core/services/mult-language.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private multiLanguageService: MultiLanguageService,
    private themeService: ThemeService
  ) {
    this.translate.addLangs(multiLanguageService.languages);
    this.translate.setDefaultLang(multiLanguageService.defaultLanguage);
    this.translate.use(multiLanguageService.defaultLanguage);
  }
}
