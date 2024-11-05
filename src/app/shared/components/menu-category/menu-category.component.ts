import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MenuCategory } from '../../models/menu-category.model';

@Component({
  selector: 'app-menu-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-category.component.html',
  styleUrl: './menu-category.component.css'
})
export class MenuCategoryComponent implements OnInit {
  @Input() category!: MenuCategory;
  @Input() isSelected: boolean = false;

  constructor() {}

  ngOnInit(): void {
      
  }
}
