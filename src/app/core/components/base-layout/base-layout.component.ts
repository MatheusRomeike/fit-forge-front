import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
  standalone: false,
})
export class BaseLayoutComponent {
  isSidebarVisible$: any;

  constructor(private sidebarService: SidebarService) {
    this.isSidebarVisible$ = this.sidebarService.isSidebarVisible$;
  }
}
