import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'theme';
  private lightTheme = 'emerald';
  private darkTheme = 'dark';
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) || this.lightTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.add('theme-transition');
    this.isDarkModeSubject.next(savedTheme === this.darkTheme);
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme =
      currentTheme === this.lightTheme ? this.darkTheme : this.lightTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(this.themeKey, newTheme);
    document.documentElement.classList.add('theme-transition');
    this.isDarkModeSubject.next(newTheme === this.darkTheme);
  }

  getCurrentTheme(): string {
    return (
      document.documentElement.getAttribute('data-theme') || this.lightTheme
    );
  }
}
