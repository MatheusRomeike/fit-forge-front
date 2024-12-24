import { Component } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-banner',
  templateUrl: './contact-banner.component.html',
  styleUrl: './contact-banner.component.scss',
  standalone: false,
})
export class ContactBannerComponent {
  faPaperPlane = faPaperPlane;
}
