import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() options: { value: number | string; label: string }[] = []; // array de opções para o select
  @Input() control: FormControl = new FormControl();
  @Input() autocomplete: string = '';
  @Input() required: boolean = false;

}
