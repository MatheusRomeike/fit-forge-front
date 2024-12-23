import { Component } from '@angular/core';
import {
  faFile,
  faMagnifyingGlass,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Menu } from '../../models/menu.model';
import { SidebarService } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';

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

  logoPath = 'assets/images/logo/logo.png';

  constructor(
    private sidebarService: SidebarService,
    public themeService: ThemeService
  ) {
    this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      if (isDarkMode) this.logoPath = 'assets/images/logo/logo-dark.png';
      else this.logoPath = 'assets/images/logo/logo.png';
    });
  }

  closeSidebar(): void {
    this.sidebarService.closeSidebar();
  }
}
