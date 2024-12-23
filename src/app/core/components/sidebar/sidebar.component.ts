import { Component } from '@angular/core';
import {
  faFile,
  faMagnifyingGlass,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Menu } from '../../models/menu.model';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faFile = faFile;
  faTimes = faTimes;

  menu: Menu[] = [
    {
      title: 'Docs',
      icon: faFile,
      iconColor: 'text-amber-500',
      link: '',
    },
    {
      title: 'Pages',
      open: true,
      subMenu: [
        {
          title: 'Dashboard',
          subMenu: [
            {
              title: 'Analytics',
              link: '',
            },
            {
              title: 'Projects',
            },
          ],
        },
        {
          title: 'Settings',
        },
        {
          title: 'Profile',
        },
      ],
    },
    {
      title: 'Media',
    },
    {
      title: 'Projects',
    },
    {
      title: 'Analytics',
    },
  ];

  constructor(private sidebarService: SidebarService) {}

  closeSidebar(): void {
    this.sidebarService.closeSidebar();
  }
}
