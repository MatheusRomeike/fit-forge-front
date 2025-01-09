import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-workout-info',
  templateUrl: './workout-info.component.html',
  styleUrl: './workout-info.component.scss',
  standalone: false,
})
export class WorkoutInfoComponent implements OnInit {
  form: FormGroup;

  faSignature = faSignature;
  faCalendarWeek = faCalendarWeek;
  faCircleInfo = faCircleInfo;
  faAngleRight = faAngleRight;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private helperService: HelperService
  ) {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      avatar: [],
    });

    this.form.get('email').disable();
  }

  ngOnInit(): void {
    this.loadData();
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
