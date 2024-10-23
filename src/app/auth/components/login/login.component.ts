import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SignInFormComponent } from '../signin-form/signin-form.component';
import { SignUpFormComponent } from '../signup-form/signup-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SignInFormComponent, SignUpFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignUpMode: boolean = false;

  toggleSignUpMode(): void {
    this.isSignUpMode = !this.isSignUpMode;
  }
}
