import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() gridReady = new EventEmitter<{ event: any; weekDay: number }>();

  faPlus = faPlus;
  faEllipsis = faEllipsis;

  addDay() {
    if (this.weekDays < 7) this.weekDays += 1;
  }

  onGridReady(event: any) {
    this.gridReady.emit(event);
  }
}
