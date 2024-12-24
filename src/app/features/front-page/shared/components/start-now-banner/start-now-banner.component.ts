import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-start-now-banner',
  templateUrl: './start-now-banner.component.html',
  styleUrl: './start-now-banner.component.scss',
  standalone: false,
})
export class StartNowBannerComponent {
  faUser = faUser;
}
