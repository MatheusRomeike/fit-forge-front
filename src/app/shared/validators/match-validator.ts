import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (control && matchingControl && control.value !== matchingControl.value) {
      return { match: true };
    }

    return null;
  };
}
