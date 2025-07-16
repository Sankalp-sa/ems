import { TestBed } from '@angular/core/testing';

import { EditLeaveService } from './edit-leave.service';

describe('EditLeaveService', () => {
  let service: EditLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
