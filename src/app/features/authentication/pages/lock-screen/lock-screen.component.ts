import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faKey, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { GoogleAuthenticationService } from '../../shared/services/google-authentication.service';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrl: './lock-screen.component.scss',
  standalone: false,
})
export class LockScreenComponent {
  faRightToBracket = faRightToBracket;
  faKey = faKey;

  password: string = '';
  email = '';

  constructor(
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private googleAuthenticationService: GoogleAuthenticationService
  ) {}

  signIn() {
    this.authenticationService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe((p) => {
        this.localStorageService.registerUser(p);
        this.router.navigate(['dashboard']);
      });
  }
}
