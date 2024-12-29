import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
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
  registerForm: FormGroup;

  constructor(
    private googleAuthenticationService: GoogleAuthenticationService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
    });

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

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authenticationService
        .register(this.registerForm.value)
        .subscribe((p) => {
          this.localStorageService.registerUser(p);
          this.router.navigate(['dashboard']);
        });
    }
  }
}
