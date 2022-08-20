import { TestBed } from '@angular/core/testing';

import { CommonSpaceService } from './common-space.service';

describe('CommonSpaceService', () => {
  let service: CommonSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
