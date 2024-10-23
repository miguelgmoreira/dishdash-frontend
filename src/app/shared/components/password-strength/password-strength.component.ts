import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [],
  templateUrl: './password-strength.component.html',
})
export class PasswordStrengthComponent implements OnChanges{
  @Input() password: string = '';
  strength: string = '';
  strengthLevel: number = 0;

  ngOnChanges() {
    this.checkPasswordStrength();
  }

  checkPasswordStrength() {
    const strongPasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    const mediumPasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');

    if (this.password.length === 0) {
      this.strength = '';
      this.strengthLevel = 0;
    } else if (strongPasswordRegex.test(this.password)) {
      this.strength = 'Forte';
      this.strengthLevel = 3;
    } else if (mediumPasswordRegex.test(this.password)) {
      this.strength = 'Média';
      this.strengthLevel = 2;
    } else {
      this.strength = 'Fraca';
      this.strengthLevel = 1;
    }
  }
}
