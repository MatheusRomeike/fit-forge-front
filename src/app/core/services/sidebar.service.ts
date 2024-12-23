import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isSidebarVisibleSubject = new BehaviorSubject<boolean>(false);
  isSidebarVisible$ = this.isSidebarVisibleSubject.asObservable();

  toggleSidebar(): void {
    const currentState = this.isSidebarVisibleSubject.value;
    this.isSidebarVisibleSubject.next(!currentState);
  }

  closeSidebar(): void {
    this.isSidebarVisibleSubject.next(false);
  }

  openSidebar(): void {
    this.isSidebarVisibleSubject.next(true);
  }
}
