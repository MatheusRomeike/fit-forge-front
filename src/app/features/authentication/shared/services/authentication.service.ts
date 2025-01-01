import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from '../../../../core/services/base.service';
import { UserSession } from '../../../../shared/models/user-session.model';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor() {
    super('api/authentication/');
  }

  login(data: Login): Observable<UserSession> {
    return this.post('Login', JSON.stringify(data), this.defaultHeader()).pipe(
      map((p) => p.result)
    );
  }

  register(data: Register): Observable<UserSession> {
    return this.post(
      'Register',
      JSON.stringify(data),
      this.defaultHeader()
    ).pipe(map((p) => p.result));
  }
}
