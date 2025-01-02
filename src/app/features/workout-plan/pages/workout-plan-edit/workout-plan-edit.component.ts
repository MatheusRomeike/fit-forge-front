import { Component } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumb.model';

@Component({
  selector: 'app-workout-plan-Edit',
  templateUrl: './workout-plan-Edit.component.html',
  styleUrl: './workout-plan-Edit.component.scss',
  standalone: false,
})
export class WorkoutPlanEditComponent {
  breadcrumb: Breadcrumb[] = [
    {
      name: 'Workout Plan',
    },
  ];
}
