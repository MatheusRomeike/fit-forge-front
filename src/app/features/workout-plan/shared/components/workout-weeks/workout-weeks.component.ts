import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workout-weeks',
  templateUrl: './workout-weeks.component.html',
  styleUrl: './workout-weeks.component.scss',
  standalone: false,
})
export class WorkoutWeeksComponent {
  @Input() weeks: number;
}
