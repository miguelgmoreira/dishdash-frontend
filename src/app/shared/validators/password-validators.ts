import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  // Validator for pattern matching
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  // Custom validator to check if password and confirm password match
  static MatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (
        !password ||
        !confirmPassword ||
        !password.value ||
        !confirmPassword.value
      )
        return null;

      return password.value === confirmPassword.value
        ? null
        : { passwordsDoNotMatch: true };
    };
  }
}
