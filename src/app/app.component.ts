import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MultiLanguageService } from './core/services/mult-language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private multiLanguageService: MultiLanguageService
  ) {
    this.translate.addLangs(multiLanguageService.languages);
    this.translate.setDefaultLang(multiLanguageService.defaultLanguage);
    this.translate.use(multiLanguageService.defaultLanguage);
  }
}
