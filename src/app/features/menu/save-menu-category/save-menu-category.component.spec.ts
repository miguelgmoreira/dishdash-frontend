import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMenuCategoryComponent } from './save-menu-category.component';

describe('SaveMenuCategoryComponent', () => {
  let component: SaveMenuCategoryComponent;
  let fixture: ComponentFixture<SaveMenuCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveMenuCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveMenuCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
