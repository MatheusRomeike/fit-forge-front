import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  faEye,
  faEyeSlash,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { GoogleAuthenticationService } from '../../shared/services/google-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false,
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleLoginButton') googleLoginButton: ElementRef;

  faRightToBracket = faRightToBracket;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  password: string = '';
  isPasswordVisible: boolean = false;

  constructor(
    private googleAuthenticationService: GoogleAuthenticationService
  ) {}

  ngAfterViewInit(): void {
    this.googleAuthenticationService.initializeGoogleSignIn();
    this.googleAuthenticationService.triggerGoogleSignIn(
      this.googleLoginButton
    );
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onPasswordInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
  }
}
