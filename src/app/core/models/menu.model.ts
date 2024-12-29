import { IconDefinition } from '@fortawesome/angular-fontawesome';

export class Menu {
  name?: string;
  icon?: IconDefinition;
  badge?: string;
  children?: Menu[];
  sectionName?: string;
  showItemCount?: boolean;
  routerLink?: string;
}
