import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Autenticacao } from '../models/autenticacao.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public autenticacao$: Subject<Autenticacao>;

  constructor() {
    this.autenticacao$ = new Subject<Autenticacao>();
  }

  public registerUser(autenticacao: Autenticacao) {
    autenticacao.avatar = autenticacao.avatar;
    localStorage.setItem(environment.userData.token, autenticacao.accessToken);
    localStorage.setItem(
      environment.userData.data,
      JSON.stringify(autenticacao)
    );
    this.autenticacao$.next(autenticacao);
  }

  public getUser(): Autenticacao {
    return JSON.parse(
      localStorage.getItem(environment.userData.data)
    ) as Autenticacao;
  }

  public getToken(): string {
    return localStorage.getItem(environment.userData.token) || '';
  }

  public setAvatar(path: string) {
    var user = this.getUser();
    user.avatar = path;
    localStorage.setItem(environment.userData.data, JSON.stringify(user));
    this.autenticacao$.next(user);
  }

  public getAvatar() {
    var user = this.getUser();
    return user.avatar;
  }

  public setNome(value: string) {
    var user = this.getUser();
    user.nome = value;
    localStorage.setItem(environment.userData.data, JSON.stringify(user));
    this.autenticacao$.next(user);
  }

  public getNome() {
    var user = this.getUser();
    return user.nome || '';
  }

  public isLoged(): boolean {
    return localStorage.getItem(environment.userData.data) ? true : false;
  }

  public logout() {
    localStorage.removeItem(environment.userData.token);
    localStorage.removeItem(environment.userData.data);
    window.location.href = '../login';
  }
}
