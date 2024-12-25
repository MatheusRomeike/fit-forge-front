import { Component } from '@angular/core';
import {
  faEye,
  faEyeSlash,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss',
  standalone: false,
})
export class LockScreenComponent {
  faRightToBracket = faRightToBracket;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  password: string = '';
  isPasswordVisible: boolean = false;
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  onPasswordInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
  }
}
