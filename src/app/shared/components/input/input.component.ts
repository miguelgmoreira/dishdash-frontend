import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorsComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() label?: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() name!: string;
  @Input() icon!: string;
  @Input() autocomplete: string = 'off';
  @Input() required: boolean = false;
}
