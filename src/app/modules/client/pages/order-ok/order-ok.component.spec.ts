import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOkComponent } from './order-ok.component';

describe('OrderOkComponent', () => {
  let component: OrderOkComponent;
  let fixture: ComponentFixture<OrderOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
