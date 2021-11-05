import { TestBed } from '@angular/core/testing';

import { MaintenceDeptoService } from './maintence-depto.service';

describe('MaintenceDeptoService', () => {
  let service: MaintenceDeptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenceDeptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
