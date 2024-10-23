import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class EmailValidators {
  // Validador para verificar se o email tem o formato correto
  static emailPatternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(!control || !control.value) return null;

      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }
}
