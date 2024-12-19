import { effect, Injectable, signal } from '@angular/core';
import { LoggedUser } from '../models/logged-user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userDataKey = 'userData';

  dataSignal = signal<LoggedUser>(
    JSON.parse(window.localStorage.getItem(this.userDataKey))
  );

  updateData(userData: LoggedUser): void {
    this.dataSignal.update(() => userData);
  }

  constructor() {
    effect(() => {
      window.localStorage.setItem(
        this.userDataKey,
        JSON.stringify(this.dataSignal())
      );
    });
  }

  isLogged() {
    return this.dataSignal();
  }
}
