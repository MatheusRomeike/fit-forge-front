import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../../../core/models/breadcrumb.model';

@Component({
  selector: 'app-workout-plan-Edit',
  templateUrl: './workout-plan-Edit.component.html',
  styleUrl: './workout-plan-Edit.component.scss',
  standalone: false,
})
export class WorkoutPlanEditComponent implements OnInit {
  breadcrumb: Breadcrumb[] = [
    {
      name: 'breadcrumb.workout',
    },
    {
      name: 'breadcrumb.my-plans',
      routerLink: '/workout-plan/my-workouts',
    },
    {
      name: 'breadcrumb.create-plan',
    },
  ];

  pageTitle = 'workout-plan.create-plan';
  editId = 0;
  currentTab = 1;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.editId = params['id'];
      if (this.editId != 0) {
        this.breadcrumb[this.breadcrumb.length - 1].name =
          'breadcrumb.edit-plan';
        this.pageTitle = 'workout-plan.edit-plan';
      }
    });
  }

  changeTab(index: number) {
    this.currentTab = index;
  }
}
