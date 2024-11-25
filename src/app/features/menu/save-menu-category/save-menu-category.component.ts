import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuCategoryService } from '../../../core/services/menu-category.service';
import { ToastService } from '../../../core/services/toast.service';
import { FormBaseComponent } from '../../../shared/components/base/form-base/form-base.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FileInputComponent } from '../../../shared/components/file-input/file-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import {
  MenuCategoryRequest,
  MenuCategoryResponse,
} from '../../../shared/models/menu-category.model';

@Component({
  selector: 'app-save-menu-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileInputComponent,
    InputComponent,
    ModalComponent,
    ButtonComponent,
  ],
  templateUrl: './save-menu-category.component.html',
  styleUrl: './save-menu-category.component.css',
})
export class SaveMenuCategoryComponent
  extends FormBaseComponent
  implements OnInit
{
  @Input() category: MenuCategoryResponse | null = null;

  @Output() categoryUpdated = new EventEmitter<any>();
  @Output() deleteCategory = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<any>();

  private originalValues: any = {};

  constructor(
    private fb: FormBuilder,
    private menuCategoryService: MenuCategoryService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.initializeFormWithItem();
  }

  override buildForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      image: [null, Validators.required],
    });
  }

  private initializeFormWithItem(): void {
    if (this.category) {
      this.form.patchValue({
        name: this.category.name,
        image: null,
      });

      // Remove o validador de "imagem" para categorias existentes
      this.form.get('image')?.clearValidators();
      this.form.get('image')?.updateValueAndValidity();

      this.originalValues = this.form.getRawValue();
    }
  }

  private isFormModified(): boolean {
    const currentValues = this.form.getRawValue();
    return (
      JSON.stringify(currentValues) !== JSON.stringify(this.originalValues)
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.category) {
        if (!this.isFormModified()) {
          this.toastService.showWarning('Nenhuma alteração foi feita.');
          return
        }

        const category: MenuCategoryRequest = {
          name: this.form.get('name')?.value,
          image: this.form.get('image')?.value,
        };

        this.menuCategoryService
          .updateMenuCategory(this.category.id, category)
          .subscribe(() => {
            this.toastService.showSuccess('Categoria atualizada com sucesso');
            this.categoryUpdated.emit();
          });
      } else {
        const category: MenuCategoryRequest = {
          name: this.form.get('name')?.value,
          image: this.form.get('image')?.value,
        };

        this.menuCategoryService.createMenuCategory(category).subscribe(() => {
          this.toastService.showSuccess('Categoria criada com sucesso');
          this.categoryUpdated.emit();
        });
      }
    } else {
      this.toastService.showError(
        'Por favor, preencha todos os campos corretamente.'
      );
    }
  }
}
