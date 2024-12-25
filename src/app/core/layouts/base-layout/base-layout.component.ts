import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
  standalone: false,
})
export class BaseLayoutComponent {
  isSidebarToggled = false;
  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isSidebarVisible$.subscribe((x) => {
      this.isSidebarToggled = x;
    });
  }
}
