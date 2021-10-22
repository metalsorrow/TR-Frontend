import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilityDetailsComponent } from './disponibility-details.component';

describe('DisponibilityDetailsComponent', () => {
  let component: DisponibilityDetailsComponent;
  let fixture: ComponentFixture<DisponibilityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibilityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
