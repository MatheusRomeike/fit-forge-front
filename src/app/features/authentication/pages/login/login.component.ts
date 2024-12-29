import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faEnvelope,
  faKey,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
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
  faEnvelope = faEnvelope;
  faKey = faKey;

  loginForm: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private googleAuthenticationService: GoogleAuthenticationService,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    this.googleAuthenticationService.initializeGoogleSignIn();
    this.googleAuthenticationService.triggerGoogleSignIn(
      this.googleLoginButton
    );
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value).subscribe((p) => {
        this.localStorageService.registerUser(p);
        this.router.navigate(['dashboard']);
      });
      // Aqui você pode chamar seu serviço de autenticação
    }
  }
}
