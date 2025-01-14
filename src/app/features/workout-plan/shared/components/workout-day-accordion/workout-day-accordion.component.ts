import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workout-day-accordion',
  templateUrl: './workout-day-accordion.component.html',
  styleUrl: './workout-day-accordion.component.scss',
  standalone: false,
})
export class WorkoutDayAccordionComponent {
  @Input() weekDay: number;
}
