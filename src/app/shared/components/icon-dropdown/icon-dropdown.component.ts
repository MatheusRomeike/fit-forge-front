import { Component, Input } from '@angular/core';
import { faEllipsis, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-dropdown',
  templateUrl: './icon-dropdown.component.html',
  styleUrl: './icon-dropdown.component.scss',
  standalone: false,
})
export class IconDropdownComponent {
  @Input() icon: IconDefinition = faEllipsis;
}
