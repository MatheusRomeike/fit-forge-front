import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthenticationLayoutComponent } from './shared/layouts/authentication-layout/authentication-layout.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthenticationLayoutComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmEmailComponent,
    LogoutComponent,
    LockScreenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    SharedModule,
    CoreModule,
  ],
})
export class AuthenticationModule {}
