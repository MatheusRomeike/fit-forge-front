import { Injectable } from '@angular/core';
import {
  faArrowsRotate,
  faChartLine,
  faCog,
  faFileContract,
  faIdCard,
  faRightFromBracket,
  faShieldHalved,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../models/menu.model';

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

  menuStructure: Menu[] = [
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
          name: 'sidebar.account-settings',
          icon: faIdCard,
          routerLink: '/settings/1',
        },
        {
          name: 'sidebar.change-password',
          icon: faArrowsRotate,
          routerLink: '/settings/2',
        },
        {
          name: 'sidebar.privacy-policy',
          icon: faShieldHalved,
          routerLink: '/settings/3',
        },
        {
          name: 'sidebar.terms-conditions',
          icon: faFileContract,
          routerLink: '/settings/4',
        },
      ],
      showItemCount: true,
    },
    {
      name: 'sidebar.logout',
      icon: faRightFromBracket,
      routerLink: '/authentication/logout',
    },
  ];
}
