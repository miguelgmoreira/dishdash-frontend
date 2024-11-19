import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
import { DeleteMenuItemComponent } from '../delete-menu-item/delete-menu-item.component';
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
    DeleteMenuItemComponent
  ],
  templateUrl: './manage-menu.component.html',
  styleUrl: './manage-menu.component.css',
})
export class ManageMenuComponent extends FormBaseComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  selectedCategory: string = 'Todos';
  isSaveMenuItemModalOpen: boolean = false;
  isDeleteMenuItemModalOpen: boolean = false;
  selectedMenuItem: MenuItemResponse | null = null;

  categories: MenuCategoryResponse[] = [];

  menuItems: MenuItemResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private menuCategoryService: MenuCategoryService,
    private menuItemService: MenuItemService,
    private router: Router
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
        this.onSearch(searchTerm);
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

  onSearch(searchTerm: string): void {
    console.log('Buscando por: ', searchTerm);
    // TODO: Implementar busca por filtro. Default, getAll().
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

  getAllMenuItems(): void {
    this.menuItemService.getAll().subscribe((items) => {
      this.menuItems = items;
    });
  }

  getItemsByCategory(categoryId: number): void {
    if (categoryId === 0) {
      this.getAllMenuItems();
    } else {
      this.menuItemService.getByCategory(categoryId).subscribe((items) => {
        this.menuItems = items;
      });
    }
  }

  selectCategory(category: MenuCategoryResponse) {
    this.selectedCategory = category.name;
  }

  editMenuItem(item: MenuItemResponse): void {
    this.selectedMenuItem = item;
    this.isSaveMenuItemModalOpen = true;
  }

  createMenuItem(): void {
    this.selectedMenuItem = null;
    this.isSaveMenuItemModalOpen = true;
  }

  deleteMenuItem(): void {
    this.isSaveMenuItemModalOpen = false;
    this.isDeleteMenuItemModalOpen = true;
    console.log(this.selectedMenuItem)
  }

  closeSaveMenuItemModal(): void {
    this.isSaveMenuItemModalOpen = false;
    this.selectedMenuItem = null;
  }

  closeDeleteModal(): void {
    this.isDeleteMenuItemModalOpen = false;
    this.isSaveMenuItemModalOpen = true;
  }

  onItemUpdated(): void {
    this.getAllMenuItems();
    this.closeSaveMenuItemModal();
  }

  onItemDeleted(): void {
    this.getAllMenuItems();
    this.isDeleteMenuItemModalOpen = false;
    this.selectedMenuItem = null;
  }

  toggleCreateMenuCategory(): void {}
}
