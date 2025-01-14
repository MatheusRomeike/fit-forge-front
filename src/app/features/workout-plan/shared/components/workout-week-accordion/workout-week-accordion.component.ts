import { Component, Input } from '@angular/core';
import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-workout-week-accordion',
  templateUrl: './workout-week-accordion.component.html',
  styleUrl: './workout-week-accordion.component.scss',
  standalone: false,
})
export class WorkoutWeekAccordionComponent {
  @Input() weekNumber: number;
  weekDays = 1;

  faPlus = faPlus;
  faEllipsis = faEllipsis;

  addDay() {
    if (this.weekDays < 7) this.weekDays += 1;
  }
}
