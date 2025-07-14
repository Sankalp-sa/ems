import { TestBed } from '@angular/core/testing';

import { MyLeavesService } from './my-leaves.service';

describe('MyLeavesService', () => {
  let service: MyLeavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyLeavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
