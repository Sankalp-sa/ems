import { TestBed } from '@angular/core/testing';

import { ManagerLeavesService } from './manager-leaves.service';

describe('ManagerLeavesService', () => {
  let service: ManagerLeavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerLeavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
