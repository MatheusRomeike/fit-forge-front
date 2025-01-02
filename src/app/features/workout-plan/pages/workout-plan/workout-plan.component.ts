import { Component } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumb.model';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrl: './workout-plan.component.scss',
  standalone: false,
})
export class WorkoutPlanComponent {
  breadcrumb: Breadcrumb[] = [
    {
      name: 'Workout Plan',
    },
  ];
}
