import { Component } from '@angular/core';
import {
  faEnvelope,
  faPaperPlane,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
  standalone: false,
})
export class ConfirmEmailComponent {
  faPaperPlane = faPaperPlane;
  faEnvelope = faEnvelope;
  faRightToBracket = faRightToBracket;
}
