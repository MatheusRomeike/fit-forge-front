import { Component } from '@angular/core';
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
}
