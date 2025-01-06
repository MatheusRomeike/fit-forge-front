import { Component } from '@angular/core';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-workout-card',
  templateUrl: './add-workout-card.component.html',
  styleUrl: './add-workout-card.component.scss',
  standalone: false,
})
export class AddWorkoutCardComponent {
  faFolderOpen = faFolderOpen;
}
