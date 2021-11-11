import { TestBed } from '@angular/core/testing';

import { MaintenanceDepartmentService } from './maintenance-department.service';

describe('MaintenanceDepartmentService', () => {
  let service: MaintenanceDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
