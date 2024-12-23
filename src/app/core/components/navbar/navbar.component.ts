import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowRightToBracket,
  faBars,
  faGear,
  faMoon,
  faSearch,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../services/login.service';
import { MultiLanguageService } from '../../services/mult-language.service';
import { SidebarService } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  avatarItems = [
    { label: 'navbar.profile', badge: 'navbar.new' },
    { label: 'navbar.settings' },
    { label: 'navbar.logout' },
  ];

  languages = [
    { label: 'navbar.english', icon: 'fi fi-us', language: 'en' },
    { label: 'navbar.portuguese', icon: 'fi fi-br', language: 'pt' },
  ];

  faBars = faBars;
  faMoon = faMoon;
  faSun = faSun;
  faArrowRightToBracket = faArrowRightToBracket;
  isDarkTheme = false;
  faSearch = faSearch;
  faGear = faGear;

  searchQuery = '';
  logoPath = 'assets/images/logo/logo.png';

  constructor(
    private themeService: ThemeService,
    private multiLanguageService: MultiLanguageService,
    private loginService: LoginService,
    private router: Router,
    private sidebarService: SidebarService
  ) {
    this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      if (isDarkMode) this.logoPath = 'assets/images/logo/logo-dark.png';
      else this.logoPath = 'assets/images/logo/logo.png';
    });
  }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.getCurrentTheme() === 'dark';
  }

  onSearchClick() {}

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkTheme = !this.isDarkTheme;
  }

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

  isLogged() {
    return false;
    // return this.loginService.isLogged();
  }

  onLoginClick() {
    this.router.navigate(['login']);
  }
}
