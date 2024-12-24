import { Component } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  standalone: false,
})
export class ThemeSwitchComponent {
  faSun = faSun;
  faMoon = faMoon;

  constructor(private themeService: ThemeService) {}

  switchTheme() {
    this.themeService.toggleTheme();
  }
}
