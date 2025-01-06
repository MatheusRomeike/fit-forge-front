import { Component, Input } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { DifficultyLabels } from '../../enums/EDifficulty';
import { GoalLabels } from '../../enums/EGoal';
import { StatusLabels } from '../../enums/EStatus';
import { WorkoutCard } from '../../models/workout-card.model';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.scss',
  standalone: false,
})
export class WorkoutCardComponent {
  @Input() workoutData: WorkoutCard;
  faEllipsis = faEllipsis;

  constructor(private translate: TranslateService) {}

  get difficultyLabel() {
    let label = this.workoutData.difficulty
      .map((element) => this.translate.instant(DifficultyLabels[element]))
      .join(' - ');
    console.log(label);
    return label;
  }

  get statusLabel() {
    return this.translate.instant(StatusLabels[this.workoutData.status]);
  }

  get goalLabel() {
    return this.translate.instant(GoalLabels[this.workoutData.goal]);
  }
}
