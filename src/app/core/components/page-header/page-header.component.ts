import { Component, Input, OnInit } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  standalone: false,
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() breadcrumb: Breadcrumb[];

  faChartLine = faChartLine;

  internBreadcrumb: Breadcrumb[] = [
    {
      name: 'Dashboard',
      icon: faChartLine,
      routerLink: '/dashboard',
    },
  ];

  ngOnInit(): void {
    this.internBreadcrumb = [...this.internBreadcrumb, ...this.breadcrumb];
  }
}
