import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  isActive(children: any[]): boolean {
    let active = false;

    for (let item of children) {
      const itemActive = this.router.isActive(item.routerLink, {
        matrixParams: 'exact',
        queryParams: 'ignored',
        paths: 'subset',
        fragment: 'ignored',
      });

      if (itemActive) {
        active = true;
        break;
      }
    }

    return active;
  }
}
