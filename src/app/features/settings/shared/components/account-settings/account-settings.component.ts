import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faBullseye,
  faCalendarDays,
  faCheck,
  faClock,
  faEnvelope,
  faRulerVertical,
  faUser,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { HelperService } from '../../../../../shared/services/helper.service';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';
import { UserData } from '../../models/user-data.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
  standalone: false,
})
export class AccountSettingsComponent implements OnInit {
  form: FormGroup;
  faCheck = faCheck;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faWeightScale = faWeightScale;
  faRulerVertial = faRulerVertical;
  faCalendarDays = faCalendarDays;
  faClock = faClock;
  faBullseye = faBullseye;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService,
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
      weight: ['', [Validators.min(0), Validators.max(600)]],
      height: ['', [Validators.min(0), Validators.max(3)]],
      startedAtGym: [''],
      exerciseDuration: ['', [Validators.min(0)]],
      goals: ['', Validators.maxLength(255)],
      avatar: null,
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
      let avatar = null;
      let avatarExtension = null;

      if (this.form.get('avatar').value) {
        avatar = await this.helperService.fileToBase64(
          this.form.get('avatar').value[0]
        );

        avatar = avatar.split(',')[1];

        avatarExtension = `.${this.form
          .get('avatar')
          .value[0].name.split('.')
          .pop()}`;
      }

      this.userService
        .saveUserData(
          new UserData(this.form.getRawValue(), avatar, avatarExtension)
        )
        .subscribe((x) => {
          this.userService.notifyService.success(
            'settings.user-data-saved-successfully'
          );
        });
    } else {
      this.userService.notifyService.error('settings.invalid-form');
      this.form.markAllAsTouched();
    }
  }
}
