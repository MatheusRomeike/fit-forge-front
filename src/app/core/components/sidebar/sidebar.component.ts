import { Component } from '@angular/core';
import { faFile, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faFile = faFile;

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
}
