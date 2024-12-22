import { IconDefinition } from '@fortawesome/angular-fontawesome';

export class Menu {
  title: string;
  icon?: IconDefinition;
  iconColor?: string;
  subMenu?: Menu[];
}
