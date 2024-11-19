import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { FormBaseComponent } from '../../../shared/components/base/form-base/form-base.component';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css',
})
export class SignInFormComponent extends FormBaseComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    console.log(this.form.value)
  }

  override buildForm(): void {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
