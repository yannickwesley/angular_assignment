import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAssignmentComponent } from './login-assignment.component';

describe('LoginAssignmentComponent', () => {
  let component: LoginAssignmentComponent;
  let fixture: ComponentFixture<LoginAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
