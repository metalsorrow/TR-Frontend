import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDetailLoginComponent } from './department-detail-login.component';

describe('DepartmentDetailLoginComponent', () => {
  let component: DepartmentDetailLoginComponent;
  let fixture: ComponentFixture<DepartmentDetailLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentDetailLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDetailLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
