import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-workout-day-table',
  templateUrl: './workout-day-table.component.html',
  styleUrl: './workout-day-table.component.scss',
  standalone: false,
})
export class WorkoutDayTableComponent {
  exercises: [];

  faPlus = faPlus;

  addExercise() {}
}
