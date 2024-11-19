import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css'
})
export class TextareaComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Input() required: boolean = false;

}
