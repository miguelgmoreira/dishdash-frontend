import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMenuItemComponent } from './save-menu-item.component';

describe('CreateMenuItemComponent', () => {
  let component: SaveMenuItemComponent;
  let fixture: ComponentFixture<SaveMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
