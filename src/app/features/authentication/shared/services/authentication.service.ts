import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from '../../../../core/services/base.service';
import { UserSession } from '../../../../shared/models/user-session.model';
declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor() {
    super('api/authentication/');
  }

  login(data: any): Observable<UserSession> {
    return this.post('Login', JSON.stringify(data), this.defaultHeader()).pipe(
      map((p) => p.result)
    );
  }
}
