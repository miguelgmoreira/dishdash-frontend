import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="control?.errors && control?.touched">
      <p *ngIf="control.errors?.['required']" class="mt-2 text-sm text-red-600">
        Esse campo é obrigatório.
      </p>
      <p *ngIf="control.errors?.['email']" class="mt-2 text-sm text-red-600">
        Formato de email inválido.
      </p>
      <p
        *ngIf="control.errors?.['minlength']"
        class="mt-2 text-sm text-red-600"
      >
        Comprimento mínimo de
        {{ control.errors?.['minlength'].requiredLength }} caracteres.
      </p>
      <p
        *ngIf="control.errors?.['passwordsDoNotMatch']"
        class="mt-2 text-sm text-red-600"
      >
        As senhas não correspondem.
      </p>
      <p
        *ngIf="control.errors?.['invalidEmail']"
        class="mt-2 text-sm text-red-600"
      >
        Email inválido.
      </p>
    </div>
  `,
})
export class FormErrorsComponent {
  @Input() control!: AbstractControl;
}
