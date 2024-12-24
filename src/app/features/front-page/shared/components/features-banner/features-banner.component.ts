import { Component } from '@angular/core';
import {
  faDumbbell,
  faStopwatch20,
  faTape,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features-banner',
  templateUrl: './features-banner.component.html',
  styleUrl: './features-banner.component.scss',
  standalone: false,
})
export class FeaturesBannerComponent {
  faStopwatch20 = faStopwatch20;
  faTape = faTape;
  faDumbbell = faDumbbell;
}
