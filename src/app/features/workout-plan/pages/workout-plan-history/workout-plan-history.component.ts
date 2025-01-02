import { Component } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumb.model';

@Component({
  selector: 'app-workout-plan-history',
  templateUrl: './workout-plan-history.component.html',
  styleUrl: './workout-plan-history.component.scss',
  standalone: false,
})
export class WorkoutPlanHistoryComponent {
  breadcrumb: Breadcrumb[] = [
    {
      name: 'Workout Plan',
    },
  ];
}
