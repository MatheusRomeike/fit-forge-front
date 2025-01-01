import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../../shared/services/loading.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { NotifyService } from '../../shared/services/notify.service';
import { BaseReturn } from '../models/base.return';

export class BaseService {
  public localStorageService: LocalStorageService = inject(LocalStorageService);
  public notifyService: NotifyService = inject(NotifyService);
  private http: HttpClient = inject(HttpClient);
  public loadingService: LoadingService = inject(LoadingService);

  public serverUrl: string = environment.serverPath;

  constructor(public baseUrl: string) {
    this.serverUrl = environment.serverPath;
  }

  public get(url: string, header: HttpHeaders): Observable<BaseReturn<any>> {
    return this.http
      .get<BaseReturn<any>>(`${this.serverUrl}${this.baseUrl}${url}`, {
        headers: header,
      })
      .pipe(
        catchError((error) => this.handlerError(error)),
        finalize(() => this.loadingService.hide()) // Garante que o loading será ocultado
      );
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
      .pipe(
        catchError((error) => this.handlerError(error)),
        finalize(() => this.loadingService.hide()) // Garante que o loading será ocultado
      );
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
      .pipe(
        catchError((error) => this.handlerError(error)),
        finalize(() => this.loadingService.hide()) // Garante que o loading será ocultado
      );
  }

  public delete(url: string, header: HttpHeaders): Observable<BaseReturn<any>> {
    return this.http
      .delete<BaseReturn<any>>(`${this.serverUrl}${this.baseUrl}${url}`, {
        headers: header,
      })
      .pipe(
        catchError((error) => this.handlerError(error)),
        finalize(() => this.loadingService.hide()) // Garante que o loading será ocultado
      );
  }

  private handlerError(error: any): Observable<any> {
    if (error.status == 401 || error.status == 403) {
      this.localStorageService.logout();
      return null;
    }

    if (error.error) {
      let message = error.error.result;

      if (error.error.errors && !message) {
        message = 'api-exception.unexpected.unexpected-error';
      }

      this.notifyService.error(message);
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
