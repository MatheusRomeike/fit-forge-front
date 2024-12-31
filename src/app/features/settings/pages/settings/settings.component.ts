import { Component } from '@angular/core';
import {
  faArrowsRotate,
  faFileContract,
  faIdCard,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
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
      name: 'Settings',
    },
    {
      name: 'Account Settings',
    },
  ];

  faIdCard = faIdCard;
  faArrowsRotate = faArrowsRotate;
  faShieldHalved = faShieldHalved;
  faFileContract = faFileContract;

  currentTab = 1;

  changeTab(index: number) {
    this.currentTab = index;
  }
}
