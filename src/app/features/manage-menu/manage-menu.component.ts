import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SearchService } from '../../core/services/search.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormBaseComponent } from '../../shared/components/form-base/form-base.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { MenuCategoryComponent } from '../../shared/components/menu-category/menu-category.component';
import { MenuItemComponent } from '../../shared/components/menu-item/menu-item.component';

@Component({
  selector: 'app-gerenciar-cardapio',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, MenuCategoryComponent, MenuItemComponent, ButtonComponent],
  templateUrl: './manage-menu.component.html',
  styleUrl: './manage-menu.component.css'
})
export class ManageMenuComponent extends FormBaseComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
      this.buildForm();

      this.searchService.searchTerm$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(searchTerm => {
        this.onSearch(searchTerm);
      });

    this.form.get('searchItem')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
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
      searchItem: ['']
    })
  }
}