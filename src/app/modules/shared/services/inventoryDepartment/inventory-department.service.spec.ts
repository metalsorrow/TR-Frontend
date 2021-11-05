import { TestBed } from '@angular/core/testing';

import { InventoryDepartmentService } from './inventory-department.service';

describe('InventoryDepartmentService', () => {
  let service: InventoryDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
