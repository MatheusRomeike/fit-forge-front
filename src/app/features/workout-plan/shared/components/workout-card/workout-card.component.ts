import { Component, Input } from '@angular/core';
import { WorkoutCard } from '../../models/workout-card.model';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.scss',
  standalone: false,
})
export class WorkoutCardComponent {
  @Input() workoutData: WorkoutCard;
}
