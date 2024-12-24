import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-logo',

  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  standalone: false,
})
export class LogoComponent {
  logoPath = 'assets/images/logo/logo.png';

  constructor(public themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      if (isDarkMode) this.logoPath = 'assets/images/logo/logo-dark.png';
      else this.logoPath = 'assets/images/logo/logo.png';
    });
  }
}
