import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuCategoryService } from '../../../core/services/menu-category.service';
import { ToastService } from '../../../core/services/toast.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { MenuCategoryResponse } from '../../../shared/models/menu-category.model';

@Component({
  selector: 'app-delete-menu-category',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './delete-menu-category.component.html',
  styleUrl: './delete-menu-category.component.css',
})
export class DeleteMenuCategoryComponent {
  @Input() category: MenuCategoryResponse | null = null;

  @Output() closeModal = new EventEmitter<any>();
  @Output() categoryDeleted = new EventEmitter<any>();

  constructor(private menuCategoryService: MenuCategoryService, private toastService: ToastService) {}

  onDeleteItem(): void {
    if (this.category) {
      this.menuCategoryService
        .deleteMenuCategory(this.category.id)
        .subscribe(() => {
          this.toastService.showSuccess("Categoria excluída com sucesso");
          this.categoryDeleted.emit();
        });
    }
  }
}
