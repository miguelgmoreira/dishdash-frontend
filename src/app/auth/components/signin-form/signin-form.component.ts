import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css'
})
export class SignInFormComponent implements OnInit {
  signInForm!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

}
