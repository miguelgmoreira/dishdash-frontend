import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-category.component.html',
  styleUrl: './menu-category.component.css'
})
export class MenuCategoryComponent implements OnInit {
  @Input() categoryLabel!: string;
  @Input() itemsCount: number = 0;

  constructor() {}

  ngOnInit(): void {
      
  }
}
