import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MenuCategoryService } from '../../../core/services/menu-category.service';
import { MenuItemService } from '../../../core/services/menu-item.service';
import { SearchService } from '../../../core/services/search.service';
import { FormBaseComponent } from '../../../shared/components/base/form-base/form-base.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { MenuCategoryComponent } from '../../../shared/components/menu-category/menu-category.component';
import { MenuItemComponent } from '../../../shared/components/menu-item/menu-item.component';
import { MenuCategoryResponse } from '../../../shared/models/menu-category.model';
import { MenuItemResponse } from '../../../shared/models/menu-item.model';
import { DeleteMenuCategoryComponent } from '../delete-menu-category/delete-menu-category.component';
import { DeleteMenuItemComponent } from '../delete-menu-item/delete-menu-item.component';
import { SaveMenuCategoryComponent } from '../save-menu-category/save-menu-category.component';
import { SaveMenuItemComponent } from '../save-menu-item/save-menu-item.component';

@Component({
  selector: 'app-gerenciar-cardapio',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    MenuCategoryComponent,
    MenuItemComponent,
    ButtonComponent,
    SaveMenuItemComponent,
    DeleteMenuItemComponent,
    SaveMenuCategoryComponent,
    DeleteMenuCategoryComponent,
  ],
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css'],
})
export class ManageMenuComponent extends FormBaseComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  selectedCategory: string = 'Todos';
  isSaveMenuItemModalOpen: boolean = false;
  isDeleteMenuItemModalOpen: boolean = false;
  isDeleteCategoryModalOpen: boolean = false;
  isSaveCategoryModalOpen: boolean = false;

  selectedMenuItem: MenuItemResponse | null = null;
  selectedCategoryObject: MenuCategoryResponse | null = null;

  categories: MenuCategoryResponse[] = [];
  menuItems: MenuItemResponse[] = [];
  itemsLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private menuCategoryService: MenuCategoryService,
    private menuItemService: MenuItemService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.getAllCategories();
    this.getAllMenuItems();

    this.searchService.searchTerm$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((searchTerm) => {
        this.getAllMenuItems(searchTerm);
      });

    this.form
      .get('searchItem')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.searchService.setSearchTerm(value);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAllMenuItems(searchTerm?: string, category?: string): void {
    const categoryId = category === 'Todos' ? 0 : this.categories.find(c => c.name === category)?.id || 0;
    this.itemsLoaded = false;
    this.menuItemService.getAll(searchTerm, categoryId).subscribe((items) => {
      this.menuItems = items;
      this.itemsLoaded = true;
    });
  }

  override buildForm(): void {
    this.form = this.fb.group({
      searchItem: [''],
    });
  }

  getAllCategories(): void {
    this.menuCategoryService.getAll().subscribe((categories) => {
      const totalItemCount = categories.reduce(
        (acc, category) => acc + category.itemCount,
        0
      );
      this.categories = [
        {
          id: 0,
          name: 'Todos',
          imageUrl:
            'https://media.gettyimages.com/id/1316145932/pt/foto/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=I-IhkYFH_BHQukS_ar7MqmCLj8TYS5ieDbocUoZ-9Z8=',
          itemCount: totalItemCount,
        },
        ...categories,
      ];
    });
  }

  selectCategory(category: MenuCategoryResponse) {
    this.selectedCategory = category.name;
    this.getAllMenuItems(this.form.get('searchItem')?.value || '', this.selectedCategory);
  }

  openEditMenuItemModal(item: MenuItemResponse): void {
    this.selectedMenuItem = item;
    this.isSaveMenuItemModalOpen = true;
  }

  openCreateMenuItemModal(): void {
    this.selectedMenuItem = null;
    this.isSaveMenuItemModalOpen = true;
  }

  openDeleteMenuItemModal(): void {
    this.isSaveMenuItemModalOpen = false;
    this.isDeleteMenuItemModalOpen = true;
  }

  openDeleteCategoryModal(): void {
    this.isSaveCategoryModalOpen = false;
    this.isDeleteCategoryModalOpen = true;
  }

  openSaveCategoryModal(category?: MenuCategoryResponse): void {
    if (category) {
      this.selectedCategoryObject = category;
    } else {
      this.selectedCategoryObject = null;
    }
    this.isSaveCategoryModalOpen = true;
  }

  closeSaveCategoryModal(): void {
    this.isSaveCategoryModalOpen = false;
    this.selectedCategoryObject = null;
  }

  closeSaveMenuItemModal(): void {
    this.isSaveMenuItemModalOpen = false;
    this.selectedMenuItem = null;
  }

  closeDeleteItemModal(): void {
    this.isDeleteMenuItemModalOpen = false;
    this.isSaveMenuItemModalOpen = true;
  }

  closeDeleteCategoryModal(): void {
    this.isDeleteCategoryModalOpen = false;
    this.isSaveCategoryModalOpen = true;
  }

  onItemUpdated(): void {
    this.getAllMenuItems(this.form.get('searchItem')?.value || '', this.selectedCategory);
    this.getAllCategories();
    this.closeSaveMenuItemModal();
  }

  onCategoryUpdated(): void {
    this.getAllMenuItems(this.form.get('searchItem')?.value || '', this.selectedCategory);
    this.getAllCategories();
    this.closeSaveCategoryModal();
  }

  onItemDeleted(): void {
    this.getAllMenuItems(this.form.get('searchItem')?.value || '', this.selectedCategory);
    this.getAllCategories();
    this.isDeleteMenuItemModalOpen = false;
    this.selectedMenuItem = null;
  }

  onCategoryDeleted(): void {
    this.getAllMenuItems(this.form.get('searchItem')?.value || '', this.selectedCategory);
    this.getAllCategories();
    this.isDeleteCategoryModalOpen = false;
    this.selectedCategoryObject = null;
    this.selectedCategory = 'Todos';
  }
}
