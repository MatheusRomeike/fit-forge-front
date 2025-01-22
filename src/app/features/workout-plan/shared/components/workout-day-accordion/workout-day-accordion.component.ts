import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-workout-day-accordion',
  templateUrl: './workout-day-accordion.component.html',
  styleUrl: './workout-day-accordion.component.scss',
  standalone: false,
})
export class WorkoutDayAccordionComponent {
  @Input() exercises: any[];
  @Input() weekDay: number;
  @Output() gridReady = new EventEmitter<{ event: any; weekDay: number }>();

  onGridReady(event: any) {
    this.gridReady.emit(event);
  }
}
