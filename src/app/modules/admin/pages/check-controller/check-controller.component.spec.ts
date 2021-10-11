import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckControllerComponent } from './check-controller.component';

describe('CheckControllerComponent', () => {
  let component: CheckControllerComponent;
  let fixture: ComponentFixture<CheckControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
