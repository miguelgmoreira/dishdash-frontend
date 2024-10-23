import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFormComponent } from './signin-form.component';

describe('LoginComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
