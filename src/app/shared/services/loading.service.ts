import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isSLoadingSubject = new BehaviorSubject<boolean>(false);
  isSLoading$ = this.isSLoadingSubject.asObservable();

  show() {
    this.isSLoadingSubject.next(true);
  }

  hide() {
    this.isSLoadingSubject.next(false);
  }
}
