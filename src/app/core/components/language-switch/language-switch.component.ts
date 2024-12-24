import { Component } from '@angular/core';
import { MultiLanguageService } from '../../services/mult-language.service';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss',
  standalone: false,
})
export class LanguageSwitchComponent {
  languages = [
    { label: 'language.english', icon: 'fi fi-us', language: 'en' },
    { label: 'language.portuguese', icon: 'fi fi-br', language: 'pt' },
  ];

  constructor(private multiLanguageService: MultiLanguageService) {}

  toggleLanguage(language: string): void {
    if (this.multiLanguageService.languageSignal() !== language) {
      this.multiLanguageService.updateLanguage(language);
    }
  }

  getLanguage() {
    const language = this.multiLanguageService.languageSignal();
    return this.languages.find((x) => x.language == language);
  }

  isActive(language: string): boolean {
    return this.multiLanguageService.languageSignal() === language;
  }
}
