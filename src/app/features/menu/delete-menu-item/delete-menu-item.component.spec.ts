import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMenuItemComponent } from './delete-menu-item.component';

describe('DeleteMenuItemComponent', () => {
  let component: DeleteMenuItemComponent;
  let fixture: ComponentFixture<DeleteMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
