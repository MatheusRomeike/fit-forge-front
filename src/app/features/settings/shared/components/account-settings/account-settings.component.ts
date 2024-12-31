import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faBullseye,
  faCalendarDays,
  faClock,
  faEnvelope,
  faRulerVertical,
  faUser,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
  standalone: false,
})
export class AccountSettingsComponent implements OnInit {
  form: FormGroup;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faWeightScale = faWeightScale;
  faRulerVertial = faRulerVertical;
  faCalendarDays = faCalendarDays;
  faClock = faClock;
  faBullseye = faBullseye;

  constructor(private formBuilder: FormBuilder) {
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
      weight: ['', [Validators.min(0)]],
      height: ['', [Validators.min(0)]],
      gymStartedAt: [''],
      gymDuration: ['', [Validators.min(0)]],
      goal: ['', Validators.maxLength(255)],
      avatar: [''],
    });
  }

  ngOnInit(): void {}
}
