import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { CredentialResponse } from 'google-one-tap';
import { environment } from '../../../../../environments/environment';
import { BaseService } from '../../../../core/services/base.service';
import { UserSession } from '../../../../shared/models/user-session.model';
declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class GoogleAuthenticationService extends BaseService {
  private clientId = environment.clientId;

  constructor(private oAuthService: OAuthService, private router: Router) {
    super('api/authentication/');
    this.initConfiguration();
  }

  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: this.clientId,
      redirectUri: window.location.origin + '/dashboard',
      scope: 'openid profile email',
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getProfile() {
    return this.oAuthService.getIdentityClaims();
  }

  getToken() {
    return this.oAuthService.getAccessToken();
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.loginWithGoogle.bind(this),
      use_fedcm_for_prompt: true,
      auto_select: false,
      cancel_on_tap_outside: false,
    });

    google.accounts.id.prompt();
  }

  triggerGoogleSignIn(element: ElementRef) {
    google.accounts.id.renderButton(element.nativeElement, {
      theme: 'filled_blue',
      size: 'large',
      text: 'continue_with',
    });
  }

  loginWithGoogle(credentials: CredentialResponse) {
    this.loadingService.show();
    this.post(
      'LoginWithGoogle',
      JSON.stringify(credentials.credential),
      this.defaultHeader()
    ).subscribe((p) => {
      this.logged(p.result);
    });
  }

  logged(result: UserSession) {
    this.localStorageService.registerUser(result);
    this.router.navigate(['dashboard']);
  }
}
