import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuCategoryResponse } from '../../models/menu-category.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-menu-category',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './menu-category.component.html',
  styleUrl: './menu-category.component.css'
})
export class MenuCategoryComponent implements OnInit {
  isSaveCategoryModalOpen: boolean = false;

  @Input() category!: MenuCategoryResponse;
  @Input() isSelected: boolean = false;
  @Output() selectCategory = new EventEmitter<any>();
  @Output() editCategory = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
      
  }
}
