import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-base',
  standalone: true,
  imports: [],
  template: ``,
})
export abstract class FormBaseComponent {
  form!: FormGroup;

  get f(): { [key: string]: FormControl } {
    return this.form.controls as { [key: string]: FormControl };
  }

  abstract buildForm(): void;
}
