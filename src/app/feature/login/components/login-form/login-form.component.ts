import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss',
    standalone: false
})
export class LoginFormComponent {
  @Output('signUp') signUp: EventEmitter<string> = new EventEmitter();

  onSignUpClick() {
    this.signUp.emit('register');
  }
}
