import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from '../../../../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor() {
    super('api/user/');
  }

  getUserData(): Observable<any> {
    return this.get('', this.authHeader()).pipe(map((p) => p.result));
  }

  saveUserData(data: any): Observable<any> {
    return this.post(
      'saveUserData',
      JSON.stringify(data),
      this.authHeader()
    ).pipe(map((p) => p.result));
  }

  changePassword(data: any): Observable<any> {
    return this.post(
      'changePassword',
      JSON.stringify(data),
      this.authHeader()
    ).pipe(map((p) => p.result));
  }
}
