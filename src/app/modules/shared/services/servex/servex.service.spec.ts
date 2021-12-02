import { TestBed } from '@angular/core/testing';

import { ServexService } from './servex.service';

describe('ServexService', () => {
  let service: ServexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
