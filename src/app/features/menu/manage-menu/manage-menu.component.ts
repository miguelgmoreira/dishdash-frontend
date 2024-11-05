import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MenuCategoryService } from '../../../core/services/menu-category.service';
import { MenuItemService } from '../../../core/services/menu-item.service';
import { SearchService } from '../../../core/services/search.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormBaseComponent } from '../../../shared/components/form-base/form-base.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { MenuCategoryComponent } from '../../../shared/components/menu-category/menu-category.component';
import { MenuItemComponent } from '../../../shared/components/menu-item/menu-item.component';
import { MenuCategory } from '../../../shared/models/menu-category.model';
import { MenuItem } from '../../../shared/models/menu-item.model';

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
  ],
  templateUrl: './manage-menu.component.html',
  styleUrl: './manage-menu.component.css',
})
export class ManageMenuComponent extends FormBaseComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  selectedCategory: string = 'Todos';

  categories: MenuCategory[] = [];

  menuItems: MenuItem[] = [];

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
    this.menuCategoryService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  getAllMenuItems(): void {
    this.menuItemService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items) => {
        this.menuItems = items;
      });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  navigateToCreateMenuItem(): void {
    this.router.navigate(['/admin/cardapio/novo'])
  }

  navigateToCreateMenuCategory(): void {
    this.router.navigate(['/admin/cardapio/categoria/novo'])
  }
}
