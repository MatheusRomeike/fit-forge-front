import { Component, HostListener } from '@angular/core';
import {
  faBars,
  faRightToBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-front-page-navbar',
  templateUrl: './front-page-navbar.component.html',
  styleUrl: './front-page-navbar.component.scss',
  standalone: false,
})
export class FrontPageNavbarComponent {
  faBars = faBars;
  faUser = faUser;
  faRightToBracket = faRightToBracket;

  isScrolled: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition >= 100) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
