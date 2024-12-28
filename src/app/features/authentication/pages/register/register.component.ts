import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { GoogleAuthenticationService } from '../../shared/services/google-authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false,
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('googleLoginButton') googleLoginButton: ElementRef;

  faUser = faUser;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  password: string = '';
  isPasswordVisible: boolean = false;

  constructor(
    private googleAuthenticationService: GoogleAuthenticationService
  ) {}

  ngOnInit(): void {
    this.googleAuthenticationService.initializeGoogleSignIn();
  }

  ngAfterViewInit(): void {
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
