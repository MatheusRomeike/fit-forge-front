import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faAngleRight,
  faCalendarWeek,
  faCircleInfo,
  faSignature,
} from '@fortawesome/free-solid-svg-icons';
import { HelperService } from '../../../../../shared/services/helper.service';
import { UserData } from '../../../../settings/shared/models/user-data.model';
import { UserService } from '../../../../settings/shared/services/user.service';
import { DifficultyLabels, EDifficulty } from '../../enums/EDifficulty';
import { EGoal, GoalLabels } from '../../enums/EGoal';

@Component({
  selector: 'app-workout-info',
  templateUrl: './workout-info.component.html',
  styleUrl: './workout-info.component.scss',
  standalone: false,
})
export class WorkoutInfoComponent implements OnInit {
  @Input() title: string = '';

  form: FormGroup;

  faSignature = faSignature;
  faCalendarWeek = faCalendarWeek;
  faCircleInfo = faCircleInfo;
  faAngleRight = faAngleRight;

  goalBadges: { id: EGoal; label: string }[] = [];
  difficultyBadges: { id: EDifficulty; label: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private helperService: HelperService
  ) {
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ],
      ],
      planWeeks: [
        '',
        [Validators.required, Validators.min(1), Validators.max(16)],
      ],
      description: ['', [Validators.minLength(0), Validators.maxLength(512)]],
      thumbnail: [],
      goals: [],
      difficulties: [],
    });
  }

  ngOnInit(): void {
    this.goalBadges = Object.keys(EGoal)
      .filter((value) => !isNaN(Number(value)))
      .map((key: string) => {
        const id = Number(key);
        return {
          id,
          label: GoalLabels[id as keyof typeof GoalLabels],
        };
      });

    this.difficultyBadges = Object.keys(EDifficulty)
      .filter((value) => !isNaN(Number(value)))
      .map((key: string) => {
        const id = Number(key);
        return {
          id,
          label: DifficultyLabels[id as keyof typeof DifficultyLabels],
        };
      });

    this.loadData();
  }

  isGoalSelected(goalId: EGoal): boolean {
    return this.form.get('goals').value?.includes(goalId);
  }

  isDifficultySelected(difficultyId: EDifficulty): boolean {
    return this.form.get('difficulties').value?.includes(difficultyId);
  }

  toggleGoal(goalId: EGoal): void {
    const goals = this.form.value.goals || [];
    const index = goals.indexOf(goalId);
    if (index === -1) {
      goals.push(goalId);
    } else {
      goals.splice(index, 1);
    }
    this.form.patchValue({ goals });
  }

  toggleDifficulty(difficultyId: EDifficulty): void {
    const difficulties = this.form.value.difficulties || [];
    const index = difficulties.indexOf(difficultyId);
    if (index === -1) {
      difficulties.push(difficultyId);
    } else {
      difficulties.splice(index, 1);
    }
    this.form.patchValue({ difficulties });
  }

  loadData() {
    this.userService.getUserData().subscribe((x: UserData) => {
      this.form.patchValue(x);
    });
  }

  async onSubmit() {
    if (this.form.valid) {
    } else {
      this.userService.notifyService.error('');
      this.form.markAllAsTouched();
    }
  }
}
