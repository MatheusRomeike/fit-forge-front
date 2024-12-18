import { Component, OnInit } from '@angular/core';
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuItems = [
    { label: 'Home' },
    { label: 'Products' },
    { label: 'About' },
    { label: 'Contact' },
  ];

  avatarItems = [
    { label: 'Profile', badge: 'New' },
    { label: 'Settings' },
    { label: 'Logout' },
  ];

  faBars = faBars;
  faMoon = faMoon;
  faSun = faSun;
  isDarkTheme = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.getCurrentTheme() === 'night';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkTheme = !this.isDarkTheme;
  }
}
