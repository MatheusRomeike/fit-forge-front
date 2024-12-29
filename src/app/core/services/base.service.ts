import { HttpClient, HttpHeaders } from '@angular/common/http';

import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { NotifyService } from '../../shared/services/notify.service';
import { BaseReturn } from '../models/base.return';

export class BaseService {
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  private notifyService: NotifyService = inject(NotifyService);
  private http: HttpClient = inject(HttpClient);
  private translateService: TranslateService = inject(TranslateService);

  public serverUrl: string = environment.serverPath;

  constructor(public baseUrl: string) {
    this.serverUrl = environment.serverPath;
  }

  public get(url: string, header: HttpHeaders): Observable<BaseReturn<any>> {
    return this.http
      .get<BaseReturn<any>>(`${this.serverUrl}${this.baseUrl}${url}`, {
        headers: header,
      })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  public post(
    url: string,
    body: any,
    header: HttpHeaders
  ): Observable<BaseReturn<any>> {
    return this.http
      .post<BaseReturn<any>>(`${this.serverUrl}${this.baseUrl}${url}`, body, {
        headers: header,
      })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  public put(
    url: string,
    body: any,
    header: HttpHeaders
  ): Observable<BaseReturn<any>> {
    return this.http
      .put<BaseReturn<any>>(`${this.serverUrl}${this.baseUrl}${url}`, body, {
        headers: header,
      })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  public delete(url: string, header: HttpHeaders): Observable<BaseReturn<any>> {
    return this.http
      .delete<BaseReturn<any>>(`${this.serverUrl}${this.baseUrl}${url}`, {
        headers: header,
      })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  private handlerError(error: any): Observable<any> {
    if (error.status == 401 || error.status == 403) {
      this.localStorageService.logout();
      return null;
    }

    if (error.error) {
      let message = error.error.result;

      this.translateService.get(message).subscribe((translatedMessage) => {
        this.notifyService.error(translatedMessage);
      });
    }

    return throwError(() => error.error || { data: [] });
  }

  public defaultHeader(): HttpHeaders {
    return new HttpHeaders({ 'content-type': 'application/json' });
  }

  public authHeader(): HttpHeaders {
    return new HttpHeaders({ 'content-type': 'application/json' }).append(
      'authorization',
      `Bearer ${this.localStorageService.getToken()}`
    );
  }
}
