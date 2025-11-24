import { TestBed } from '@angular/core/testing';

import { Plants } from './plants';

describe('Plants', () => {
  let service: Plants;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Plants);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
