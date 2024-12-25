import { Component, HostListener, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false,
})
export class SidebarComponent implements OnInit {
  faTimes = faTimes;

  isSidebarToggled = true;
  isSidebarAutoHide = false;

  constructor(public sidebarService: SidebarService) {
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
