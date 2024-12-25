import { Component } from '@angular/core';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  standalone: false,
})
export class LogoutComponent {
  faRightToBracket = faRightToBracket;
}
