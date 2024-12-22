import { IconDefinition } from '@fortawesome/angular-fontawesome';

export class Menu {
  title: string;
  icon?: IconDefinition;
  iconColor?: string;
  link?: string;
  open?: boolean;
  subMenu?: Menu[];
}
