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
          routerLink: '/user/account-settings',
        },
        {
          name: 'sidebar.change-password',
          icon: faArrowsRotate,
          routerLink: '/user/change-password',
        },
        {
          name: 'sidebar.privacy-policy',
          icon: faShieldHalved,
          routerLink: '/user/privacy-policy',
        },
        {
          name: 'sidebar.terms-conditions',
          icon: faFileContract,
          routerLink: '/user/terms-conditions',
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
