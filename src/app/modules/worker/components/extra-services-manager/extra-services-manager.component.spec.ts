import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraServicesManagerComponent } from './extra-services-manager.component';

describe('ExtraServicesManagerComponent', () => {
  let component: ExtraServicesManagerComponent;
  let fixture: ComponentFixture<ExtraServicesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraServicesManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraServicesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
