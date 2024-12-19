import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  declarations: [
    IndexComponent,
    LoginFormComponent,
    RegisterFormComponent,
    GoogleAuthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SharedModule,
  ],
})
export class LoginModule {}
