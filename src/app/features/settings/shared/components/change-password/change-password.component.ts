import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCheck, faKey } from '@fortawesome/free-solid-svg-icons';
import { matchValidator } from '../../../../../shared/validators/match-validator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  standalone: false,
})
export class ChangePasswordComponent {
  form: FormGroup;
  faCheck = faCheck;
  faKey = faKey;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group(
      {
        currentPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ],
        ],
      },
      {
        validators: matchValidator('newPassword', 'confirmPassword'),
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.changePassword(this.form.value).subscribe((x) => {
        this.userService.notifyService.success(
          'settings.password-changed-successfully'
        );
      });
    } else {
      if (this.form.errors && this.form.errors['match']) {
        this.userService.notifyService.error('settings.passwords-must-match');
      } else {
        this.userService.notifyService.error('settings.invalid-form');
      }
      this.form.markAllAsTouched();
    }
  }
}
