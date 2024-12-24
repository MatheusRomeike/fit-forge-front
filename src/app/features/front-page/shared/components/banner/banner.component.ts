import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  standalone: false,
})
export class BannerComponent {
  faUser = faUser;
}
