import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrl: './register-form.component.scss',
    standalone: false
})
export class RegisterFormComponent {
  @Output('login') login: EventEmitter<string> = new EventEmitter();

  onLoginClick() {
    this.login.emit('login');
  }
}
