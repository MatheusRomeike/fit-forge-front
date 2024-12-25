import { Component, HostListener, OnInit } from '@angular/core';
import {
  faArrowsRotate,
  faChartLine,
  faCog,
  faTimes,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from '../../services/sidebar.service';
import { MenuItem } from '../menu/menu.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false,
})
export class SidebarComponent implements OnInit {
  faTimes = faTimes;
  faCog = faCog;
  faChartLine = faChartLine;
  faUserCircle = faUserCircle;
  faArrowsRotate = faArrowsRotate;

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
        {
          name: 'sidebar.dashboard',
          icon: faChartLine,
          routerLink: '/dashboard/2',
        },
      ],
      showItemCount: true,
    },
  ];

  isSidebarToggled = true;
  isSidebarAutoHide = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isSidebarVisible$.subscribe((isSidebarToggled) => {
      this.isSidebarToggled = isSidebarToggled;
    });
  }

  ngOnInit(): void {
    this.checkSidebarAutoHide();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkSidebarAutoHide();
  }

  checkSidebarAutoHide() {
    this.isSidebarAutoHide = window.innerWidth < 1200;
  }

  checkCollapseMenu() {
    return this.isSidebarAutoHide ? false : this.isSidebarToggled;
  }

  toggle() {
    this.sidebarService.toggleSidebar();
  }
}
