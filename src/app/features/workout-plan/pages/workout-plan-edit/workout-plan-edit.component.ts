import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faCheckDouble,
  faCircleInfo,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from '../../../../core/models/breadcrumb.model';

@Component({
  selector: 'app-workout-plan-Edit',
  templateUrl: './workout-plan-Edit.component.html',
  styleUrl: './workout-plan-Edit.component.scss',
  standalone: false,
})
export class WorkoutPlanEditComponent implements OnInit {
  breadcrumb: Breadcrumb[] = [
    {
      name: 'breadcrumb.workout',
    },
    {
      name: 'breadcrumb.my-plans',
      routerLink: '/workout-plan/my-workouts',
    },
    {
      name: 'breadcrumb.create-plan',
    },
  ];

  faCircleInfo = faCircleInfo;
  faDumbbell = faDumbbell;
  faCheckDouble = faCheckDouble;

  pageTitle = 'workout-plan.create-plan';
  editId = 0;
  currentTab = 1;

  formInfo: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formInfo = this.formBuilder.group({
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
    this.activatedRoute.params.subscribe((params) => {
      this.editId = params['id'];
      if (this.editId != 0) {
        this.breadcrumb[this.breadcrumb.length - 1].name =
          'breadcrumb.edit-plan';
        this.pageTitle = 'workout-plan.edit-plan';
      }
    });
  }

  changeTab(index: number) {
    this.currentTab = index;
  }
}
