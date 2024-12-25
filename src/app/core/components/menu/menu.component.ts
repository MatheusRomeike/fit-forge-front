import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface MenuItem {
  name?: string;
  icon?: IconDefinition;
  badge?: string;
  children?: MenuItem[];
  sectionName?: string;
  showItemCount?: boolean;
  routerLink?: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false,
})
export class MenuComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() collapsed: boolean;
}
