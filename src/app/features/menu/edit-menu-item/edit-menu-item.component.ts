import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './edit-menu-item.component.html',
  styleUrl: './edit-menu-item.component.css'
})
export class EditMenuItemComponent implements OnInit {
  itemId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.itemId = parseInt(this.route.snapshot.paramMap.get('id')!);

      console.log(this.itemId)
  }

}
