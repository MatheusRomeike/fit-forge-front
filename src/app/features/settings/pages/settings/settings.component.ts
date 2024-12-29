import { Component } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from '../../../../core/models/breadcrumb.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: false,
})
export class SettingsComponent {
  breadcrumb: Breadcrumb[] = [
    {
      name: 'Dashboard',
      icon: faChartLine,
      routerLink: '/dashboard',
    },
    {
      name: 'Settings',
    },
    {
      name: 'Account Settings',
    },
  ];

  currentTab = 1;

  changeTab(index: number) {
    this.currentTab = index;
  }
}
