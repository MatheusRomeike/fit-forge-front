import { Component, Input } from '@angular/core';
import { Breadcrumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  standalone: false,
})
export class PageHeaderComponent {
  @Input() pageTitle: string;
  @Input() breadcrumb: Breadcrumb[];
}
