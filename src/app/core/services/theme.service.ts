import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'theme';
  private lightTheme = 'emerald';
  private darkTheme = 'dim';
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    // Primeiro, tenta carregar o tema salvo no localStorage
    const savedTheme = localStorage.getItem(this.themeKey);

    // Se não houver tema salvo, verifica a preferência do navegador
    if (!savedTheme) {
      const prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const defaultTheme = prefersDarkScheme ? this.darkTheme : this.lightTheme;
      this.setTheme(defaultTheme);
    } else {
      this.setTheme(savedTheme);
    }
  }

  private setTheme(theme: string): void {
    // Aplica o tema no documento e atualiza o estado do BehaviorSubject
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.add('theme-transition');
    this.isDarkModeSubject.next(theme === this.darkTheme);
    // Salva o tema no localStorage
    localStorage.setItem(this.themeKey, theme);
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme =
      currentTheme === this.lightTheme ? this.darkTheme : this.lightTheme;
    this.setTheme(newTheme);
  }

  getCurrentTheme(): string {
    return (
      document.documentElement.getAttribute('data-theme') || this.lightTheme
    );
  }
}
