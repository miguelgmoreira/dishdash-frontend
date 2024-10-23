import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorsComponent } from '../../../shared/components/form-errors/form-errors.component';
import { EmailValidators } from '../../../shared/validators/email-validators';
import { PasswordValidators } from '../../../shared/validators/password-validators';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorsComponent],
  templateUrl: './signup-form.component.html',
})
export class SignUpFormComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        restaurantName: [null, Validators.required],
        phone: [null, Validators.required],
        email: [null, [Validators.required, EmailValidators.emailPatternValidator()]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            PasswordValidators.patternValidator(new RegExp('(?=.*[0-9])'), {
              requiresDigit: true,
            }),
            PasswordValidators.patternValidator(new RegExp('(?=.*[A-Z])'), {
              requiresUppercase: true,
            }),
            PasswordValidators.patternValidator(new RegExp('(?=.*[a-z])'), {
              requiresLowercase: true,
            }),
            PasswordValidators.patternValidator(
              new RegExp('(?=.*[$@^!%*?&-_])'),
              {
                requiresSpecialChars: true,
              }
            ),
          ],
        ],
        confirmPassword: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            PasswordValidators.MatchValidator(),
          ],
        ],
      },
      { validators: PasswordValidators.MatchValidator() }
    );
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Sign up form: ', this.signupForm.value);
    }


  }

  get f() {
    return this.signupForm.controls;
  }
}
