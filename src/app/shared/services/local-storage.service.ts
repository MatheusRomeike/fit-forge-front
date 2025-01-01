import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserSession } from '../models/user-session.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public authentication$: Subject<UserSession>;

  constructor() {
    this.authentication$ = new Subject<UserSession>();
  }

  public registerUser(authentication: UserSession) {
    authentication.avatar = authentication.avatar;
    localStorage.setItem(
      environment.userData.token,
      authentication.accessToken
    );
    localStorage.setItem(
      environment.userData.data,
      JSON.stringify(authentication)
    );
    this.authentication$.next(authentication);
  }

  public getUser(): UserSession {
    return JSON.parse(
      localStorage.getItem(environment.userData.data)
    ) as UserSession;
  }

  public getToken(): string {
    return localStorage.getItem(environment.userData.token) || '';
  }

  public setAvatar(path: string) {
    var user = this.getUser();
    user.avatar = path;
    localStorage.setItem(environment.userData.data, JSON.stringify(user));
    this.authentication$.next(user);
  }

  public getAvatar() {
    var user = this.getUser();
    return user?.avatar;
  }

  public setName(value: string) {
    var user = this.getUser();
    user.name = value;
    localStorage.setItem(environment.userData.data, JSON.stringify(user));
    this.authentication$.next(user);
  }

  public getName() {
    var user = this.getUser();
    return user?.name || '';
  }

  public getEmail() {
    var user = this.getUser();
    return user?.email || '';
  }

  public isSocialAccountLogin() {
    var user = this.getUser();
    return user?.socialAccountLogin || false;
  }

  public isLogged(): boolean {
    return localStorage.getItem(environment.userData.data) ? true : false;
  }

  public logout(redirect: boolean = true) {
    localStorage.removeItem(environment.userData.token);
    localStorage.removeItem(environment.userData.data);
    if (redirect) window.location.href = '../authentication';
  }
}
