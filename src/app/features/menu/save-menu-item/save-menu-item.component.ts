import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuCategoryService } from '../../../core/services/menu-category.service';
import { MenuItemService } from '../../../core/services/menu-item.service';
import { FormBaseComponent } from '../../../shared/components/base/form-base/form-base.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FileInputComponent } from '../../../shared/components/file-input/file-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { MenuItemRequest, MenuItemResponse } from '../../../shared/models/menu-item.model';

@Component({
  selector: 'app-save-menu-item',
  standalone: true,
  imports: [
    ModalComponent,
    InputComponent,
    ReactiveFormsModule,
    SelectComponent,
    ButtonComponent,
    TextareaComponent,
    FileInputComponent,
  ],
  templateUrl: './save-menu-item.component.html',
  styleUrl: './save-menu-item.component.css',
})
export class SaveMenuItemComponent
  extends FormBaseComponent
  implements OnInit
{
  @Input() item: MenuItemResponse | null = null; // Recebe o item, se estiver editando

  @Output() closeModal = new EventEmitter<any>();
  @Output() itemUpdated = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<void>();

  categoryOptions: { value: number; label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private menuCategoryService: MenuCategoryService,
    private menuItemService: MenuItemService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.getAllCategories();
    this.initializeFormWithItem();
  }

  override buildForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      price: [null, Validators.required],
      category: ['', Validators.required],
      description: [null, [Validators.required, Validators.maxLength(200)]],
      image: [null, Validators.required],
    });
  }

  getAllCategories(): void {
    this.menuCategoryService.getAll().subscribe((menuCategories) => {
      this.categoryOptions = menuCategories.map((menuCategory) => ({
        value: menuCategory.id,
        label: menuCategory.name,
      }));
    });
  }

  private initializeFormWithItem(): void {
    if (this.item) {
      this.form.patchValue({
        name: this.item.name,
        price: this.item.price,
        category: this.item.category.id,
        description: this.item.description,
        image: null,
      });
  
      this.form.get('image')?.clearValidators();
      this.form.get('image')?.updateValueAndValidity();
    }
  }

  // Envia o formulário - cria ou edita conforme o caso
  onSubmit(): void {
    if (this.form.valid) {
      const menuItem: MenuItemRequest = {
        name: this.form.get('name')?.value,
        price: this.form.get('price')?.value,
        categoryId: this.form.get('category')?.value,
        description: this.form.get('description')?.value,
        image: this.form.get('image')?.value,
      };

      if (this.item) {
        console.log(menuItem)
        this.menuItemService.updateMenuItem(this.item.id, menuItem).subscribe(() => {
          this.itemUpdated.emit();
        });
      } else {
        this.menuItemService.createMenuItem(menuItem).subscribe(() => {
          this.itemUpdated.emit();
        });
      }
    } else {
      console.log('Formulário inválido!');
    }
  }
}
