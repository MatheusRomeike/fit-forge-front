import { Injectable } from '@angular/core';
import {
  faArrowsRotate,
  faChartLine,
  faCog,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../components/menu/menu.component';

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

  menuStructure: MenuItem[] = [
    {
      sectionName: 'sidebar.main',
    },
    {
      name: 'sidebar.dashboard',
      icon: faChartLine,
      routerLink: '/dashboard',
    },
    {
      sectionName: 'sidebar.others',
    },
    { name: 'sidebar.profile', icon: faUserCircle },
    {
      name: 'sidebar.settings',
      icon: faCog,
      children: [
        {
          name: 'sidebar.change-password',
          icon: faArrowsRotate,
          routerLink: '/authentication/reset-password',
        },
      ],
      showItemCount: true,
    },
  ];
}
