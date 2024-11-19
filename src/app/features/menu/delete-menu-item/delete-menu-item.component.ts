import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItemService } from '../../../core/services/menu-item.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { MenuItemResponse } from '../../../shared/models/menu-item.model';

@Component({
  selector: 'app-delete-menu-item',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './delete-menu-item.component.html',
  styleUrl: './delete-menu-item.component.css'
})
export class DeleteMenuItemComponent {
  @Input() item: MenuItemResponse | null = null;

  @Output() closeModal = new EventEmitter<any>();
  @Output() itemDeleted = new EventEmitter<any>();

  constructor(private menuItemService: MenuItemService) {}

  onDeleteItem(): void {
    if(this.item) {
      this.menuItemService.deleteMenuItem(this.item.id).subscribe(() => {
        this.itemDeleted.emit();
      });
    }
  }

}
